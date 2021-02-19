from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_url_path='')


# app = Flask(__name__, static_folder="../dist/static", template_folder="../dist")


@app.route('/')
def index():
    # Return index.html from the static folder
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
