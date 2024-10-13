from flask import render_template
from gymlogger import app, db
from gymlogger.models import Exercise, Workout

@app.route("/")
def home():
    return render_template("base.html")