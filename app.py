import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from bson import ObjectId
from flask import Flask, request, make_response, jsonify
from flask_pymongo import PyMongo
import os
import logging
from flask_login import LoginManager, login_user, login_required, logout_user
from model import User
from itsdangerous import SignatureExpired, BadSignature
from werkzeug.security import generate_password_hash, check_password_hash

# init sentry to track errors and exceptions
sentry_sdk.init(
    dsn="https://1382a32a42344fc1bc78fb00bdabea5d@o358880.ingest.sentry.io/5603815",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)

app = Flask(__name__, static_url_path='', static_folder="./client/build/")
app.config['SECRET_KEY'] = '88b45ad77947e629573de6f95d2466bc65283b4abddf0594'

# logging
app.logger.setLevel(logging.DEBUG)
handler = logging.FileHandler('app.log', encoding='UTF-8')
logging_format = logging.Formatter(
    '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')
handler.setFormatter(logging_format)
app.logger.addHandler(handler)
app.logger.info("========== Logging Started ==========")

# set up MongoDB
app.config["MONGO_URI"] = "mongodb+srv://491:454491@491.kqgyf.mongodb.net/moguls?retryWrites=true&w=majority"
mongo = PyMongo(app)

# setup login
login_manager = LoginManager()
login_manager.init_app(app)

DirPATH = os.path.abspath(os.path.dirname(__name__))
ALLOWED_EXTENSIONS = {'mp4', 'mkv'}


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == 'GET':
        # TODO: may need to change the file
        return app.send_static_file('index.html')

    if request.method == 'POST':
        if not request.data:
            response = make_response(
                "Bad Request: Server did not received any data")
            response.mimetype = 'text/plain'
            return response, 400
        if not (request.json and 'username' in request.json and 'password' in request.json):
            response = make_response("Bad Request: Server received invalid Json")
            response.mimetype = 'text/plain'
            return response, 400

        username = request.json['username']
        password = generate_password_hash(request.json['password'])

        collection = mongo.db['users']

        # check if username is already exist
        user = collection.find_one({'username': username})
        if user:
            response = make_response("This username has already been taken.")
            response.mimetype = 'text/plain'
            return response, 201

        result = collection.insert_one({'username': username, 'password': password})
        if result:
            response = make_response(str(result))
            response.mimetype = 'text/plain'
            return response, 200
        error_msg = "Internal Server or Database Error: Fail to create new user"
        app.logger.error(error_msg)
        response = make_response(error_msg)
        response.mimetype = 'text/plain'
        return response, 500


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        # TODO: may need to change the file
        return app.send_static_file('index.html')

    if request.method == 'POST':
        if not request.data:
            response = make_response(
                "Bad Request: Server did not received any data")
            response.mimetype = 'text/plain'
            return response, 400
        if not (request.json and 'username' in request.json and 'password' in request.json):
            response = make_response("Bad Request: Server received invalid Json")
            response.mimetype = 'text/plain'
            return response, 400

        username = request.json["username"]
        password = request.json['password']

        collection = mongo.db['users']
        user = collection.find_one({'username': username})

        if user:
            if check_password_hash(user['password'], password):
                token = User.generate_token(username)
                return jsonify({'token': token}), 200
            else:
                response = make_response("Wrong username or password")
                response.mimetype = 'text/plain'
                return response, 201
        else:
            response = make_response("User does not exist.")
            response.mimetype = 'text/plain'
            return response, 201


@app.route('/logout')
def logout():
    logout_user()
    # TODO: may need to change the file
    return app.send_static_file('index.html')


@login_manager.request_loader
def user_loader(received_request):
    try:
        token = received_request.values.get('token')
    except BadSignature:
        app.logger.info("Token is invalid")
        return
    except SignatureExpired:
        app.logger.info("Token is expired")
        return
    return User(User.verify_token(token))


@login_required
@app.route('/')
def index():
    # Return index.html from the static folder
    return app.send_static_file('index.html')


@login_required
@app.route('/videoUpload', methods=['POST'])
def image_preprocess():
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
    file_path = DirPATH + "\\temp\\" + video.filename
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

    return jsonify(data), 200


@login_required
@app.route('/getAllData', methods=['GET'])
def get_all_data():
    # find target collection
    table_name = "test"  # for early develop only
    collection = mongo.db[table_name]

    # get all records
    records = collection.find({})
    if records:
        data = {}
        for item in records:
            item['_id'] = str(item['_id'])
            data[item['_id']] = item
        return jsonify(data), 200
    error_msg = "Internal Server or Database Error: Failed to get all records"
    app.logger.error(error_msg)
    response = make_response(error_msg)
    response.mimetype = 'text/plain'
    return response, 500


@login_required
@app.route('/addData', methods=['POST'])
def add_data():
    # check received data
    if not request.data:
        response = make_response(
            "Bad Request: Server did not received any data")
        response.mimetype = 'text/plain'
        return response, 400
    if not request.json:
        response = make_response("Bad Request: Server received empty Json")
        response.mimetype = 'text/plain'
        return response, 400

    # find target collection
    table_name = "test"  # for early develop only
    collection = mongo.db[table_name]

    # add to target collection and perform error checking
    result = collection.insert(request.json)
    if result:
        response = make_response(str(result))
        response.mimetype = 'text/plain'
        return response, 200
    error_msg = "Internal Server or Database Error: Add failed"
    app.logger.error(error_msg)
    response = make_response(error_msg)
    response.mimetype = 'text/plain'
    return response, 500


@login_required
@app.route('/deleteData/<record_id>', methods=['DELETE'])
def delete_data(record_id):
    # find target collection
    table_name = "test"  # for early develop only
    collection = mongo.db[table_name]

    # delete from collection
    result = collection.delete_one({'_id': ObjectId(record_id)})

    if result and result.acknowledged:
        if result.deleted_count:
            return "", 200
        response = make_response(
            "Bad Request: Server did not find the record to delete")
        response.mimetype = 'text/plain'
        return response, 400
    error_msg = "Internal Server or Database Error: Delete failed"
    app.logger.error(error_msg)
    response = make_response(error_msg)
    response.mimetype = 'text/plain'
    return response, 500


# verify sentry is working
@app.route('/debug-sentry')
def trigger_error():
    app.logger.debug("This error is used to verify sentry is working")
    division_by_zero = 1 / 0


if __name__ == '__main__':
    app.run()
