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

@app.route("/delete_category/<int:category_id>")
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    return redirect(url_for("categories"))

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
            exercise_one_total_one = int(request.form.get("exercise_one_total_one")),
            exercise_one_total_two = int(request.form.get("exercise_one_total_two")),
            exercise_one_total_three = int(request.form.get("exercise_one_total_three")),
            exercise_two_name = request.form.get("exercise_two_name"),
            exercise_two_category = request.form.get("exercise_two_category"),
            exercise_two_modifier_one = request.form.get("exercise_two_modifier_one"),
            exercise_two_modifier_two = request.form.get("exercise_two_modifier_two"),
            exercise_two_modifier_three = request.form.get("exercise_two_modifier_three"),
            exercise_two_total_one = int(request.form.get("exercise_two_total_one")),
            exercise_two_total_two = int(request.form.get("exercise_two_total_two")),
            exercise_two_total_three = int(request.form.get("exercise_two_total_three")),
            exercise_three_name = request.form.get("exercise_three_name"),
            exercise_three_category = request.form.get("exercise_three_category"),
            exercise_three_modifier_one = request.form.get("exercise_three_modifier_one"),
            exercise_three_modifier_two = request.form.get("exercise_three_modifier_two"),
            exercise_three_modifier_three = request.form.get("exercise_three_modifier_three"),
            exercise_three_total_one = int(request.form.get("exercise_three_total_one")),
            exercise_three_total_two = int(request.form.get("exercise_three_total_two")),
            exercise_three_total_three = int(request.form.get("exercise_three_total_three")),
            exercise_four_name = request.form.get("exercise_four_name"),
            exercise_four_category = request.form.get("exercise_four_category"),
            exercise_four_modifier_one = request.form.get("exercise_four_modifier_one"),
            exercise_four_modifier_two = request.form.get("exercise_four_modifier_two"),
            exercise_four_modifier_three = request.form.get("exercise_four_modifier_three"),
            exercise_four_total_one = int(request.form.get("exercise_four_total_one")),
            exercise_four_total_two = int(request.form.get("exercise_four_total_two")),
            exercise_four_total_three = int(request.form.get("exercise_four_total_three")),
            exercise_five_name = request.form.get("exercise_five_name"),
            exercise_five_category = request.form.get("exercise_five_category"),
            exercise_five_modifier_one = request.form.get("exercise_five_modifier_one"),
            exercise_five_modifier_two = request.form.get("exercise_five_modifier_two"),
            exercise_five_modifier_three = request.form.get("exercise_five_modifier_three"),
            exercise_five_total_one = int(request.form.get("exercise_five_total_one")),
            exercise_five_total_two = int(request.form.get("exercise_five_total_two")),
            exercise_five_total_three = int(request.form.get("exercise_five_total_three")),
            exercise_six_name = request.form.get("exercise_six_name"),
            exercise_six_category = request.form.get("exercise_six_category"),
            exercise_six_modifier_one = request.form.get("exercise_six_modifier_one"),
            exercise_six_modifier_two = request.form.get("exercise_six_modifier_two"),
            exercise_six_modifier_three = request.form.get("exercise_six_modifier_three"),
            exercise_six_total_one = int(request.form.get("exercise_six_total_one")),
            exercise_six_total_two = int(request.form.get("exercise_six_total_two")),
            exercise_six_total_three = int(request.form.get("exercise_six_total_three")),
            exercise_seven_name = request.form.get("exercise_seven_name"),
            exercise_seven_category = request.form.get("exercise_seven_category"),
            exercise_seven_modifier_one = request.form.get("exercise_seven_modifier_one"),
            exercise_seven_modifier_two = request.form.get("exercise_seven_modifier_two"),
            exercise_seven_modifier_three = request.form.get("exercise_seven_modifier_three"),
            exercise_seven_total_one = int(request.form.get("exercise_seven_total_one")),
            exercise_seven_total_two = int(request.form.get("exercise_seven_total_two")),
            exercise_seven_total_three = int(request.form.get("exercise_seven_total_three")),
            exercise_eight_name = request.form.get("exercise_eight_name"),
            exercise_eight_category = request.form.get("exercise_eight_category"),
            exercise_eight_modifier_one = request.form.get("exercise_eight_modifier_one"),
            exercise_eight_modifier_two = request.form.get("exercise_eight_modifier_two"),
            exercise_eight_modifier_three = request.form.get("exercise_eight_modifier_three"),
            exercise_eight_total_one = int(request.form.get("exercise_eight_total_one")),
            exercise_eight_total_two = int(request.form.get("exercise_eight_total_two")),
            exercise_eight_total_three = int(request.form.get("exercise_eight_total_three")),
            exercise_nine_name = request.form.get("exercise_nine_name"),
            exercise_nine_category = request.form.get("exercise_nine_category"),
            exercise_nine_modifier_one = request.form.get("exercise_nine_modifier_one"),
            exercise_nine_modifier_two = request.form.get("exercise_nine_modifier_two"),
            exercise_nine_modifier_three = request.form.get("exercise_nine_modifier_three"),
            exercise_nine_total_one = int(request.form.get("exercise_nine_total_one")),
            exercise_nine_total_two = int(request.form.get("exercise_nine_total_two")),
            exercise_nine_total_three = int(request.form.get("exercise_nine_total_three")),
            exercise_ten_name = request.form.get("exercise_ten_name"),
            exercise_ten_category = request.form.get("exercise_ten_category"),
            exercise_ten_modifier_one = request.form.get("exercise_ten_modifier_one"),
            exercise_ten_modifier_two = request.form.get("exercise_ten_modifier_two"),
            exercise_ten_modifier_three = request.form.get("exercise_ten_modifier_three"),
            exercise_ten_total_one = int(request.form.get("exercise_ten_total_one")),
            exercise_ten_total_two = int(request.form.get("exercise_ten_total_two")),
            exercise_ten_total_three = int(request.form.get("exercise_ten_total_three")),
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