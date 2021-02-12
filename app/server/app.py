from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# app = Flask(__name__, static_folder="../dist/static", template_folder="../dist")


@app.route('/')
def index():
    return "<h1>Hello World: This is our server using Flask</h1>"


if __name__ == '__main__':
    app.run()
