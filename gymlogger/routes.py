from flask import render_template, request, redirect, url_for
from gymlogger import app, db
from gymlogger.models import Exercise, Workout, Category

@app.route("/")
def home():
    return render_template("base.html")


@app.route("/categories")
def categories():
    categories = Category.query.order_by(Category.category_name).all()
    return render_template("categories.html", categories=categories)


@app.route("/add_category", methods=["GET", "POST"])
def add_category():
    if request.method == "POST":
        category = Category(category_name=request.form.get("category_name"))
        db.session.add(category)
        db.session.commit()
        return redirect(url_for("categories"))
    return render_template("add_category.html")

@app.route("/exercises")
def exercises():
    return render_template("exercises.html")

@app.route("/add_exercise", methods=["GET", "POST"])
def add_exercise():
    if request.method == "POST":
        exercise = Exercise(
            exercise_title = request.form.get("exercise_title"),
            exercise_category = request.form.get("exercise_category")
        )
        db.session.add(exercise)
        db.session.commit()
        return redirect(url_for("exercises"))
    return render_template("add_exercise.html")