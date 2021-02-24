from bson import ObjectId
from flask import Flask, request, make_response, jsonify
from flask_pymongo import PyMongo
import os
from typing import Dict

# app = Flask(__name__, static_url_path='')
app = Flask(__name__, static_url_path='', static_folder="./client/build/")

# set up MongoDB
app.config["MONGO_URI"] = "mongodb+srv://491:454491@491.kqgyf.mongodb.net/moguls?retryWrites=true&w=majority"
mongo = PyMongo(app)


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
    # find target collection
    table_name = "test"   # for early develop only
    collection = mongo.db[table_name]

    # get all records
    records = collection.find({})
    if records:
        data = {}
        for item in records:
            item['_id'] = str(item['_id'])
            data[item['_id']] = item
        return jsonify(data), 200
    response = make_response("Internal Server or Database Error: Failed to get all records")
    response.mimetype = 'text/plain'
    return response, 500


@app.route('/addData', methods=['POST'])
def add_data():
    # check received data
    if not request.data:
        response = make_response("Bad Request: Server did not received any data")
        response.mimetype = 'text/plain'
        return response, 400
    if not request.json:
        response = make_response("Bad Request: Server received empty Json")
        response.mimetype = 'text/plain'
        return response, 400

    # find target collection
    table_name = "test"   # for early develop only
    collection = mongo.db[table_name]

    # add to target collection and perform error checking
    result = collection.insert(request.json)
    if result:
        response = make_response(str(result))
        response.mimetype = 'text/plain'
        return response, 200
    response = make_response("Internal Server or Database Error: Add failed")
    response.mimetype = 'text/plain'
    return response, 500


@app.route('/deleteData/<record_id>', methods=['DELETE'])
def delete_data(record_id):
    # find target collection
    table_name = "test"   # for early develop only
    collection = mongo.db[table_name]

    # delete from collection
    result = collection.delete_one({'_id': ObjectId(record_id)})

    if result and result.acknowledged:
        if result.deleted_count:
            return "", 200
        response = make_response("Bad Request: Server did not find the record to delete")
        response.mimetype = 'text/plain'
        return response, 400
    response = make_response("Internal Server or Database Error: Delete failed")
    response.mimetype = 'text/plain'
    return response, 500


if __name__ == '__main__':
    app.run()
