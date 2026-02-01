import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
if os.path.exists("env.py"):
    import env as env # noqa
from flask_pymongo import PyMongo
from bson.objectid import ObjectId


app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

# ---------- SQLAlchemy config ----------
if os.environ.get("DEVELOPMENT") == "True":
    uri = os.environ.get("DB_URL")
    if not uri:
        raise RuntimeError("DB_URL is not set but DEVELOPMENT=True")
else:
    uri = os.environ.get("DATABASE_URL")
    if not uri:
        raise RuntimeError("DATABASE_URL is not set on Heroku")

    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = uri


mongo = PyMongo(app)

db = SQLAlchemy(
    engine_options={ 'connect_args': { 'connect_timeout': 1000 }}
)

db.init_app(run)

from gymlogger import routes # noqa
