from flask import render_template, request, redirect, url_for
from gymlogger import app, db
from gymlogger.models import Exercise, Workout, Category

@app.route("/")
def home():
    return render_template("base.html")


@app.route("/categories")
def categories():
    categories = list(Category.query.order_by(Category.category_name).all())
    return render_template("categories.html", categories=categories)


@app.route("/add_category", methods=["GET", "POST"])
def add_category():
    if request.method == "POST":
        category = Category(category_name=request.form.get("category_name"))
        db.session.add(category)
        db.session.commit()
        return redirect(url_for("categories"))
    return render_template("add_category.html")

@app.route("/edit_category/<int:category_id>", methods=["GET", "POST"])
def edit_category(category_id):
    category = Category.query.get_or_404(category_id)
    if request.method == "POST":
        category.category_name = request.form.get("category_name")
        db.session.commit()
        return redirect(url_for("categories"))
    return render_template("edit_category.html", category=category)

@app.route("/exercises")
def exercises():
    exercises = list(Exercise.query.order_by(Exercise.exercise_title).all())
    return render_template("exercises.html", exercises=exercises)

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

@app.route("/edit_exercise/<int:exercise_id>", methods=["GET", "POST"])
def edit_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    if request.method == "POST":
        exercise.exercise_title = request.form.get("exercise_title")
        exercise.exercise_category = request.form.get("exercise_category")
        db.session.commit()
        return redirect(url_for("exercises"))
    return render_template("edit_exercise.html", exercise=exercise)

@app.route("/workouts")
def workouts():
    workouts = list(Workout.query.order_by(Workout.workout_title).all())
    return render_template("workouts.html", workouts=workouts)

@app.route("/record_workout", methods=["GET", "POST"])
def record_workout():
    if request.method == "POST":
        workout = Workout(
            workout_title = request.form.get("workout_title"),
            workout_date_time = request.form.get("workout_date_time"),
            workout_location = request.form.get("workout_location"),
            exercise_one_name = request.form.get("exercise_one_name"),
            exercise_one_category = request.form.get("exercise_one_category"),
            exercise_one_modifier_one = request.form.get("exercise_one_modifier_one"),
            exercise_one_modifier_two = request.form.get("exercise_one_modifier_two"),
            exercise_one_modifier_three = request.form.get("exercise_one_modifier_three"),
            exercise_one_total_one = request.form.get("exercise_one_total_one"),
            exercise_one_total_two = request.form.get("exercise_one_total_two"),
            exercise_one_total_three = request.form.get("exercise_one_total_three"),
            exercise_two_name = request.form.get("exercise_two_name"),
            exercise_two_category = request.form.get("exercise_two_category"),
            exercise_two_modifier_one = request.form.get("exercise_two_modifier_one"),
            exercise_two_modifier_two = request.form.get("exercise_two_modifier_two"),
            exercise_two_modifier_three = request.form.get("exercise_two_modifier_three"),
            exercise_two_total_one = request.form.get("exercise_two_total_one"),
            exercise_two_total_two = request.form.get("exercise_two_total_two"),
            exercise_two_total_three = request.form.get("exercise_two_total_three")
        )
        db.session.add(workout)
        db.session.commit()
        return redirect(url_for("workouts"))
    return render_template("record_workout.html")

@app.route("/edit_workout/<int:workout_id>", methods=["GET", "POST"])
def edit_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.workout_title = request.form.get("workout_title")
        workout.workout_date_time= request.form.get("workout_date_time")
        db.session.commit()
        return redirect(url_for("workouts"))
    return render_template("edit_workout.html", workout=workout)

@app.route("/add_location", methods=["GET", "POST"])
def add_location():
    if request.method == "POST":
        location = Location(location_name=request.form.get("location_name"))
        db.session.add(location)
        db.session.commit()
        return redirect(url_for("locations"))
    return render_template("add_location.html")

@app.route("/edit_location/<int:location_id>", methods=["GET", "POST"])
def edit_location(location_id):
    location = Location.query.get_or_404(location_id)
    if request.method == "POST":
        location.location_name = request.form.get("location_name")
        db.session.commit()
        return redirect(url_for("locations"))
    return render_template("edit_location.html", location=location)