from flask import Flask, jsonify
from database import db
from models.user import User
from models.task import Task

app = Flask(__name__)




@app.route('/')
def hello_world():
    return {'message': 'Hello, World!'}







if __name__ == '__main__':
    app.run(debug=True)