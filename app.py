from flask import Flask, request, jsonify
import os
from typing import Dict

# app = Flask(__name__, static_url_path='')
app = Flask(__name__, static_url_path='', static_folder="./client/build/")

DirPATH = os.path.abspath(os.path.dirname(__name__))


@app.route('/')
def index():
    # Return index.html from the static folder
    return app.send_static_file('index.html')


@app.route('/videoUpload', methods=['POST'])
def image_preprocess():
    # save the video to temp folder for processing
    video = request.files['video']
    path = DirPATH + "/temp/"
    file_path = path + video.filename
    video.save(file_path)

    # TODO: using machine learning and computer vision to process video

    # TODO: delete video file from temp

    # TODO: Send back the result to client

    # Fake data for demonstration
    data = {
        'kneeHipAngle': 175,
        'hipChestAngle': 183,
        'chestArmAngle': 185,
        'armAngleDiff': 14,
        'kneeAngleDiff': 8
    }

    return jsonify(data)


# TODO: link database and communicate with database
@app.route('/getAllData', methods=['GET'])
def get_all_data():
    pass


@app.route('/addData', methods=['POST'])
def add_data():
    pass


@app.route('/deleteData', methods=['POST'])
def delete_data():
    pass


if __name__ == '__main__':
    app.run()
