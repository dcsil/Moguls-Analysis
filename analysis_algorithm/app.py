from flask import Flask, request, make_response, jsonify
import sys
import cv2
import os
from sys import platform
import argparse
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DirPATH = os.path.abspath(os.path.dirname(__name__))
ALLOWED_EXTENSIONS = {'mp4', 'mkv', 'png'}


@app.route('/', methods=['POST'])
def server_api():
    # receive video file
    print(request.files.to_dict())
    video = request.files['file']

    # check for file type
    if '.' not in video.filename or video.filename.split('.')[1] not in ALLOWED_EXTENSIONS:
        error_msg = "Bad Request: Uploaded file type is not supported."
        app.logger.error(error_msg)
        response = make_response(error_msg)
        response.mimetype = 'text/plain'
        return response, 400

    # save the video to temp folder for processing
    file_path = DirPATH + "/src/" + video.filename
    video.save(file_path)

    data = image_preprocess(file_path)

    return jsonify(data), 200


def image_preprocess(file_path):
    try:
        # Import Openpose (Windows/Ubuntu/OSX)
        dir_path = os.path.dirname(os.path.realpath(__file__))
        try:
            # Windows Import
            if platform == "win32":
                # Change these variables to point to the correct folder (Release/x64 etc.)
                sys.path.append(dir_path + '/../../python/openpose/Release');
                os.environ['PATH'] = os.environ[
                                         'PATH'] + ';' + dir_path + '/../../x64/Release;' + dir_path + '/../../bin;'
                import pyopenpose as op
            else:
                # Change these variables to point to the correct folder (Release/x64 etc.)
                sys.path.append('../../python');
                # If you run `make install` (default path is `/usr/local/python` for Ubuntu), you can also access the OpenPose/python module from there. This will install OpenPose and the python library at your desired installation path. Ensure that this is in your python path in order to use it.
                # sys.path.append('/usr/local/python')
                from openpose import pyopenpose as op
        except ImportError as e:
            print(
                'Error: OpenPose library could not be found. Did you enable `BUILD_PYTHON` in CMake and have this Python script in the right folder?')
            raise e

        # Flags
        parser = argparse.ArgumentParser()
        parser.add_argument("--image_path", default=file_path,
                            help="Process an image. Read all standard formats (jpg, png, bmp, etc.).")
        args = parser.parse_known_args()

        # Custom Params (refer to include/openpose/flags.hpp for more parameters)
        params = dict()
        params["model_folder"] = "../../../models/"
        params["write_images"] = "./src/temp"
        params["write_images_format"] = "png"

        # Add others in path?
        for i in range(0, len(args[1])):
            curr_item = args[1][i]
            if i != len(args[1]) - 1:
                next_item = args[1][i + 1]
            else:
                next_item = "1"
            if "--" in curr_item and "--" in next_item:
                key = curr_item.replace('-', '')
                if key not in params:  params[key] = "1"
            elif "--" in curr_item and "--" not in next_item:
                key = curr_item.replace('-', '')
                if key not in params: params[key] = next_item

        # Starting OpenPose
        opWrapper = op.WrapperPython()
        opWrapper.configure(params)
        opWrapper.start()

        # Process Image
        datum = op.Datum()
        imageToProcess = cv2.imread(args[0].image_path)
        datum.cvInputData = imageToProcess
        opWrapper.emplaceAndPop(op.VectorDatum([datum]))

        # Calculate Angles
        data = {
            'kneeHipAngle': calculate_angle(datum.poseKeypoints[0][12], datum.poseKeypoints[0][13], datum.poseKeypoints[0][14]),
            'hipChestAngle': calculate_angle(datum.poseKeypoints[0][5], datum.poseKeypoints[0][12], datum.poseKeypoints[0][13]),
            'chestArmAngle': calculate_angle(datum.poseKeypoints[0][12], datum.poseKeypoints[0][5], datum.poseKeypoints[0][6]),
            'armAngleDiff': calculate_angle(datum.poseKeypoints[0][4], datum.poseKeypoints[0][5], datum.poseKeypoints[0][7]),
            'kneeAngleDiff': calculate_angle(datum.poseKeypoints[0][11], datum.poseKeypoints[0][13], datum.poseKeypoints[0][14])
        }
        return data

    except Exception as e:
        print(e)
        sys.exit(-1)


def get_length_square(a, b):

    x = abs(float(a[0]) - float(b[0]))
    y = abs(float(a[1]) - float(b[1]))

    return x ** 2 + y ** 2


def calculate_angle(coord_a, coord_b, coord_c):
    """ Use cos law to  get the degree

    :param coord_a: coordinate of point A
    :param coord_b: coordinate of point B
    :param coord_c: coordinate of point C
    :return:  Angle of B in degree
    """

    a = get_length_square(coord_b, coord_c)
    b = get_length_square(coord_a, coord_c)
    c = get_length_square(coord_a, coord_b)

    cos_b = (a + c - b) / (2 * math.sqrt(a) * math.sqrt(c))

    return round(math.degrees(math.acos(cos_b)))


if __name__ == '__main__':
    app.run(port=5050)
    # image_preprocess('./src/1.png')
    # # image_preprocess('./src/2.png')
    # # image_preprocess('./src/21.png')
    # # image_preprocess('./src/30.png')
