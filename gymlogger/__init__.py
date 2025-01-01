import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
if os.path.exists("env.py"):
    import env # noqa
from flask_pymongo import PyMongo
from bson.objectid import ObjectId


app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URL")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo = PyMongo(app)

db = SQLAlchemy(app)

from gymlogger import routes # noqa
