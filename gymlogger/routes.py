from flask import render_template, request, redirect, url_for, flash, session

from gymlogger import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from gymlogger.models import Exercise, Workout, Category, Modifier, User
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.errors import InvalidId

mongo = PyMongo(app)

@app.route("/")
def home():
    return render_template("base.html")

@app.route("/register",  methods=["GET", "POST"])
def register():
    if request.method == "POST":
                # check if username already exists in users collection in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))

    # acts as the else statement if no existing user is found to create user
        register = {
            "username": request.form.get("username").lower(),
            "password": request.form.get("password"),
            "password_hash": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(register)

        user = User(
            username = request.form.get("username"),
            password = generate_password_hash(request.form.get("password")),
        )
        
        db.session.add(user)
        db.session.commit()
        # put the new user into 'session' cookie
        session["user"] = request.form.get("username")
        flash("Registration Successful!")

        return redirect(url_for("profile", username=session["user"]))
    return render_template("register.html")

@app.route("/signin", methods=["GET", "POST"] )
def signin():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        session["user"] = request.form.get("username")

        user = User.query.filter_by(username=username).first()
        if user: 
            if check_password_hash(user.password, password):
                flash("Logged in successfully. Welcome, {}".format(
                    request.form.get(("username"))))
                return redirect(url_for("profile", username=username))

            else:
                # invalid password match
                flash("Incorrect Username and/or Password")
                return redirect(url_for("signin"))
        else:
            flash("register a free account to proceed")
            return redirect(url_for("register"))
            

    return render_template("signin.html", boolean=True)

@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    workouts = list(Workout.query.order_by(Workout.workout_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    username = session["user"]
    if session["user"]:
        return render_template("profile.html", categories=categories, username=username, workouts=workouts)


    return redirect(url_for("signin"))

@app.route("/signout")
def signout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("signin"))
    
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
        mongo_category = {
                "mongo_category": request.form.get("category_name"),
            }
        mongo.db.categories.insert_one(mongo_category)
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
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises = list(Exercise.query.order_by(Exercise.exercise_title).all())
    return render_template("exercises.html", exercises=exercises, categories=categories)

@app.route("/add_exercise", methods=["GET", "POST"])
def add_exercise():
    categories = list(Category.query.order_by(Category.category_name).all())
    if request.method == "POST":
        exercise = Exercise(
            exercise_title = request.form.get("exercise_title"),
            exercise_category = request.form.get("exercise_category")
        )
        mongo_exercise = {
            "mongo_exercise": request.form.get("exercise_title"),
            "mongo_exercise_category": request.form.get("exercise_category")
        }
        db.session.add(exercise)
        db.session.commit()
        mongo.db.exercises.insert_one(mongo_exercise)
        return redirect(url_for("exercises"))
    return render_template("add_exercise.html", categories=categories)


@app.route("/edit_exercise/<int:exercise_id>", methods=["GET", "POST"])
def edit_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    if request.method == "POST":
        exercise.exercise_title = request.form.get("exercise_title")
        exercise.exercise_category = request.form.get("exercise_category")
        db.session.commit()
        return redirect(url_for("exercises"))
    return render_template("edit_exercise.html", exercise=exercise)

@app.route("/delete_exercise/<int:exercise_id>")
def delete_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    db.session.delete(exercise)
    db.session.commit()
    return redirect(url_for("exercises"))

@app.route("/modifiers")
def modifiers():
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    return render_template("modifiers.html", modifiers=modifiers)

@app.route("/add_modifier", methods=["GET", "POST"])
def add_modifier():
    if request.method == "POST":
        modifier = Modifier(
            modifier_name = request.form.get("modifier_name"),
        )
        db.session.add(modifier)
        db.session.commit()
        return redirect(url_for("modifiers"))
    return render_template("add_modifier.html")


@app.route("/workouts")
def workouts():
    workouts = list(Workout.query.order_by(Workout.workout_title).all())
    return render_template("workouts.html", workouts=workouts)

@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    workouts = list(mongo.db.workouts.find({"$text": {"$search": query}}))
    return render_template("search_workouts.html", workouts=workouts)

@app.route("/record_workout", methods=["GET", "POST"])
def record_workout():
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises = list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    if request.method == "POST":
        workout = Workout(
            workout_title = request.form.get("workout_title"),
            created_by = session["user"],
            workout_date_time = request.form.get("workout_date_time"),
            workout_location = request.form.get("workout_location"),
            exercise_one_name = request.form.get("exercise_one_name"),
            exercise_one_category = request.form.get("exercise_one_category"),
            exercise_one_modifier_one = request.form.get("exercise_one_modifier_one"),
            exercise_one_modifier_two = request.form.get("exercise_one_modifier_two"),
            exercise_one_modifier_three = request.form.get("exercise_one_modifier_three"),
            exercise_one_total_one = float(request.form.get("exercise_one_total_one")),
            exercise_one_total_two = float(request.form.get("exercise_one_total_two")),
            exercise_one_total_three = float(request.form.get("exercise_one_total_three")),
            exercise_two_name = request.form.get("exercise_two_name"),
            exercise_two_category = request.form.get("exercise_two_category"),
            exercise_two_modifier_one = request.form.get("exercise_two_modifier_one"),
            exercise_two_modifier_two = request.form.get("exercise_two_modifier_two"),
            exercise_two_modifier_three = request.form.get("exercise_two_modifier_three"),
            exercise_two_total_one = float(request.form.get("exercise_two_total_one")),
            exercise_two_total_two = float(request.form.get("exercise_two_total_two")),
            exercise_two_total_three = float(request.form.get("exercise_two_total_three")),
            exercise_three_name = request.form.get("exercise_three_name"),
            exercise_three_category = request.form.get("exercise_three_category"),
            exercise_three_modifier_one = request.form.get("exercise_three_modifier_one"),
            exercise_three_modifier_two = request.form.get("exercise_three_modifier_two"),
            exercise_three_modifier_three = request.form.get("exercise_three_modifier_three"),
            exercise_three_total_one = float(request.form.get("exercise_three_total_one")),
            exercise_three_total_two = float(request.form.get("exercise_three_total_two")),
            exercise_three_total_three = float(request.form.get("exercise_three_total_three")),
            exercise_four_name = request.form.get("exercise_four_name"),
            exercise_four_category = request.form.get("exercise_four_category"),
            exercise_four_modifier_one = request.form.get("exercise_four_modifier_one"),
            exercise_four_modifier_two = request.form.get("exercise_four_modifier_two"),
            exercise_four_modifier_three = request.form.get("exercise_four_modifier_three"),
            exercise_four_total_one = float(request.form.get("exercise_four_total_one")),
            exercise_four_total_two = float(request.form.get("exercise_four_total_two")),
            exercise_four_total_three = float(request.form.get("exercise_four_total_three")),
            exercise_five_name = request.form.get("exercise_five_name"),
            exercise_five_category = request.form.get("exercise_five_category"),
            exercise_five_modifier_one = request.form.get("exercise_five_modifier_one"),
            exercise_five_modifier_two = request.form.get("exercise_five_modifier_two"),
            exercise_five_modifier_three = request.form.get("exercise_five_modifier_three"),
            exercise_five_total_one = float(request.form.get("exercise_five_total_one")),
            exercise_five_total_two = float(request.form.get("exercise_five_total_two")),
            exercise_five_total_three = float(request.form.get("exercise_five_total_three")),
            exercise_six_name = request.form.get("exercise_six_name"),
            exercise_six_category = request.form.get("exercise_six_category"),
            exercise_six_modifier_one = request.form.get("exercise_six_modifier_one"),
            exercise_six_modifier_two = request.form.get("exercise_six_modifier_two"),
            exercise_six_modifier_three = request.form.get("exercise_six_modifier_three"),
            exercise_six_total_one = float(request.form.get("exercise_six_total_one")),
            exercise_six_total_two = float(request.form.get("exercise_six_total_two")),
            exercise_six_total_three = float(request.form.get("exercise_six_total_three")),
            exercise_seven_name = request.form.get("exercise_seven_name"),
            exercise_seven_category = request.form.get("exercise_seven_category"),
            exercise_seven_modifier_one = request.form.get("exercise_seven_modifier_one"),
            exercise_seven_modifier_two = request.form.get("exercise_seven_modifier_two"),
            exercise_seven_modifier_three = request.form.get("exercise_seven_modifier_three"),
            exercise_seven_total_one = float(request.form.get("exercise_seven_total_one")),
            exercise_seven_total_two = float(request.form.get("exercise_seven_total_two")),
            exercise_seven_total_three = float(request.form.get("exercise_seven_total_three")),
            exercise_eight_name = request.form.get("exercise_eight_name"),
            exercise_eight_category = request.form.get("exercise_eight_category"),
            exercise_eight_modifier_one = request.form.get("exercise_eight_modifier_one"),
            exercise_eight_modifier_two = request.form.get("exercise_eight_modifier_two"),
            exercise_eight_modifier_three = request.form.get("exercise_eight_modifier_three"),
            exercise_eight_total_one = float(request.form.get("exercise_eight_total_one")),
            exercise_eight_total_two = float(request.form.get("exercise_eight_total_two")),
            exercise_eight_total_three = float(request.form.get("exercise_eight_total_three")),
            exercise_nine_name = request.form.get("exercise_nine_name"),
            exercise_nine_category = request.form.get("exercise_nine_category"),
            exercise_nine_modifier_one = request.form.get("exercise_nine_modifier_one"),
            exercise_nine_modifier_two = request.form.get("exercise_nine_modifier_two"),
            exercise_nine_modifier_three = request.form.get("exercise_nine_modifier_three"),
            exercise_nine_total_one = float(request.form.get("exercise_nine_total_one")),
            exercise_nine_total_two = float(request.form.get("exercise_nine_total_two")),
            exercise_nine_total_three = float(request.form.get("exercise_nine_total_three")),
            exercise_ten_name = request.form.get("exercise_ten_name"),
            exercise_ten_category = request.form.get("exercise_ten_category"),
            exercise_ten_modifier_one = request.form.get("exercise_ten_modifier_one"),
            exercise_ten_modifier_two = request.form.get("exercise_ten_modifier_two"),
            exercise_ten_modifier_three = request.form.get("exercise_ten_modifier_three"),
            exercise_ten_total_one = float(request.form.get("exercise_ten_total_one")),
            exercise_ten_total_two = float(request.form.get("exercise_ten_total_two")),
            exercise_ten_total_three = float(request.form.get("exercise_ten_total_three")),
            additional_information = request.form.get("additional_information"),
            is_public=bool(True if request.form.get("is-visible") else False),
        )
        db.session.add(workout)
        db.session.commit()
        # recorded_exercise_ids = list(Workout.query.filter(workout.id).first())
        #latest_recorded_id = recorded_exercise_ids[-1]
        is_public = "on" if request.form.get("is-visible") else "off"
        mongo_workout = {
            "workout_title": request.form.get("workout_title"),
            "created_by": session["user"],
            #"workout_id": latest_recorded_id,
            "workout_date_time": request.form.get("workout_date_time"),
            "workout_location": request.form.get("workout_location"),
            "exercise_one_name": request.form.get("exercise_one_name"),
            "exercise_one_category": request.form.get("exercise_one_category"),
            "exercise_one_modifier_one": request.form.get("exercise_one_modifier_one"),
            "exercise_one_modifier_two":  request.form.get("exercise_one_modifier_two"),
            "exercise_one_modifier_three": request.form.get("exercise_one_modifier_three"),
            "exercise_one_total_one": float(request.form.get("exercise_one_total_one")),
            "exercise_one_total_two": float(request.form.get("exercise_one_total_two")),
            "exercise_one_total_three": float(request.form.get("exercise_one_total_three")),
            "exercise_two_name": request.form.get("exercise_two_name"),
            "exercise_two_category": request.form.get("exercise_two_category"),
            "exercise_two_modifier_one": request.form.get("exercise_two_modifier_one"),
            "exercise_two_modifier_two": request.form.get("exercise_two_modifier_two"),
            "exercise_two_modifier_three": request.form.get("exercise_two_modifier_three"),
            "exercise_two_total_one": float(request.form.get("exercise_two_total_one")),
            "exercise_two_total_two": float(request.form.get("exercise_two_total_two")),
            "exercise_two_total_three": float(request.form.get("exercise_two_total_three")),
            "exercise_three_name": request.form.get("exercise_three_name"),
            "exercise_three_category": request.form.get("exercise_three_category"),
            "exercise_three_modifier_one": request.form.get("exercise_three_modifier_one"),
            "exercise_three_modifier_two": request.form.get("exercise_three_modifier_two"),
            "exercise_three_modifier_three": request.form.get("exercise_three_modifier_three"),
            "exercise_three_total_one": float(request.form.get("exercise_three_total_one")),
            "exercise_three_total_two": float(request.form.get("exercise_three_total_two")),
            "exercise_three_total_three": float(request.form.get("exercise_three_total_three")),
            "exercise_four_name": request.form.get("exercise_four_name"),
            "exercise_four_category": request.form.get("exercise_four_category"),
            "exercise_four_modifier_one": request.form.get("exercise_four_modifier_one"),
            "exercise_four_modifier_two": request.form.get("exercise_four_modifier_two"),
            "exercise_four_modifier_three": request.form.get("exercise_four_modifier_three"),
            "exercise_four_total_one": float(request.form.get("exercise_four_total_one")),
            "exercise_four_total_two": float(request.form.get("exercise_four_total_two")),
            "exercise_four_total_three": float(request.form.get("exercise_four_total_three")),
            "exercise_five_name": request.form.get("exercise_five_name"),
            "exercise_five_category": request.form.get("exercise_five_category"),
            "exercise_five_modifier_one": request.form.get("exercise_five_modifier_one"),
            "exercise_five_modifier_two": request.form.get("exercise_five_modifier_two"),
            "exercise_five_modifier_three": request.form.get("exercise_five_modifier_three"),
            "exercise_five_total_one": float(request.form.get("exercise_five_total_one")),
            "exercise_five_total_two": float(request.form.get("exercise_five_total_two")),
            "exercise_five_total_three": float(request.form.get("exercise_five_total_three")),
            "exercise_six_name": request.form.get("exercise_six_name"),
            "exercise_six_category": request.form.get("exercise_six_category"),
            "exercise_six_modifier_one": request.form.get("exercise_six_modifier_one"),
            "exercise_six_modifier_two": request.form.get("exercise_six_modifier_two"),
            "exercise_six_modifier_three": request.form.get("exercise_six_modifier_three"),
            "exercise_six_total_one": float(request.form.get("exercise_six_total_one")),
            "exercise_six_total_two": float(request.form.get("exercise_six_total_two")),
            "exercise_six_total_three": float(request.form.get("exercise_six_total_three")),
            "exercise_seven_name": request.form.get("exercise_seven_name"),
            "exercise_seven_category": request.form.get("exercise_seven_category"),
            "exercise_seven_modifier_one": request.form.get("exercise_seven_modifier_one"),
            "exercise_seven_modifier_two": request.form.get("exercise_seven_modifier_two"),
            "exercise_seven_modifier_three": request.form.get("exercise_seven_modifier_three"),
            "exercise_seven_total_one": float(request.form.get("exercise_seven_total_one")),
            "exercise_seven_total_two": float(request.form.get("exercise_seven_total_two")),
            "exercise_seven_total_three": float(request.form.get("exercise_seven_total_three")),
            "exercise_eight_name": request.form.get("exercise_eight_name"),
            "exercise_eight_category": request.form.get("exercise_eight_category"),
            "exercise_eight_modifier_one": request.form.get("exercise_eight_modifier_one"),
            "exercise_eight_modifier_two": request.form.get("exercise_eight_modifier_two"),
            "exercise_eight_modifier_three": request.form.get("exercise_eight_modifier_three"),
            "exercise_eight_total_one": float(request.form.get("exercise_eight_total_one")),
            "exercise_eight_total_two": float(request.form.get("exercise_eight_total_two")),
            "exercise_eight_total_three": float(request.form.get("exercise_eight_total_three")),
            "exercise_nine_name": request.form.get("exercise_nine_name"),
            "exercise_nine_category": request.form.get("exercise_nine_category"),
            "exercise_nine_modifier_one": request.form.get("exercise_nine_modifier_one"),
            "exercise_nine_modifier_two": request.form.get("exercise_nine_modifier_two"),
            "exercise_nine_modifier_three": request.form.get("exercise_nine_modifier_three"),
            "exercise_nine_total_one": float(request.form.get("exercise_nine_total_one")),
            "exercise_nine_total_two": float(request.form.get("exercise_nine_total_two")),
            "exercise_nine_total_three": float(request.form.get("exercise_nine_total_three")),
            "exercise_ten_name": request.form.get("exercise_ten_name"),
            "exercise_ten_category": request.form.get("exercise_ten_category"),
            "exercise_ten_modifier_one":  request.form.get("exercise_ten_modifier_one"),
            "exercise_ten_modifier_two": request.form.get("exercise_ten_modifier_two"),
            "exercise_ten_modifier_three": request.form.get("exercise_ten_modifier_three"),
            "exercise_ten_total_one": float(request.form.get("exercise_ten_total_one")),
            "exercise_ten_total_two": float(request.form.get("exercise_ten_total_two")),
            "exercise_ten_total_three": float(request.form.get("exercise_ten_total_three")),
            "additional_information": request.form.get("additional_information"),
            "is_public": is_public,
        }
        mongo.db.workouts.insert_one(mongo_workout)
        return redirect(url_for("workouts"))
    return render_template("record_workout.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts)


@app.route("/workout_details/<workout_id>")
def workout_details(workout_id):
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    workout = Workout.query.get_or_404(workout_id)
    return render_template(
        "workout_details.html", workout=workout, workouts=workouts, categories=categories, exercises=exercises)

@app.route("/edit_workout/<int:workout_id>", methods=["GET", "POST"])
def edit_workout(workout_id):
    workoutID = str(workout_id)
    print(workoutID)
    workout = Workout.query.get_or_404(workout_id)
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    exercises = list(Exercise.query.order_by(Exercise.exercise_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    if request.method == "POST":
        workout.workout_title = request.form.get("workout_title")
        workout.workout_date_time= request.form.get("workout_date_time")
        workout_location = request.form.get("workout_location")
        workout.exercise_one_name = request.form.get("edit_exercise_one_name")
        workout.exercise_one_category = request.form.get("edit_exercise_one_category")
        workout.exercise_one_modifier_one = request.form.get("exercise_one_modifier_one")
        workout.exercise_one_modifier_two = request.form.get("exercise_one_modifier_two")
        workout.exercise_one_modifier_three = request.form.get("exercise_one_modifier_three")
        workout.exercise_one_total_one = float(request.form.get("exercise_one_total_one"))
        workout.exercise_one_total_two = float(request.form.get("exercise_one_total_two"))
        workout.exercise_one_total_three = float(request.form.get("exercise_one_total_three"))
        workout.exercise_two_name = request.form.get("exercise_two_name")
        workout.exercise_two_category = request.form.get("exercise_two_category")
        workout.exercise_two_modifier_one = request.form.get("exercise_two_modifier_one")
        workout.exercise_two_modifier_two = request.form.get("exercise_two_modifier_two")
        workout.exercise_two_modifier_three = request.form.get("exercise_two_modifier_three")
        workout.exercise_two_total_one = float(request.form.get("exercise_two_total_one"))
        workout.exercise_two_total_two = float(request.form.get("exercise_two_total_two"))
        workout.exercise_two_total_three = float(request.form.get("exercise_two_total_three"))
        workout.exercise_three_name = request.form.get("exercise_three_name")
        workout.exercise_three_category = request.form.get("exercise_three_category")
        workout.exercise_three_modifier_one = request.form.get("exercise_three_modifier_one")
        workout.exercise_three_modifier_two = request.form.get("exercise_three_modifier_two")
        workout.exercise_three_modifier_three = request.form.get("exercise_three_modifier_three")
        workout.exercise_three_total_one = float(request.form.get("exercise_three_total_one"))
        workout.exercise_three_total_two = float(request.form.get("exercise_three_total_two"))
        workout.exercise_three_total_three = float(request.form.get("exercise_three_total_three"))
        workout.exercise_four_name = request.form.get("exercise_four_name")
        workout.exercise_four_category = request.form.get("exercise_four_category")
        workout.exercise_four_modifier_one = request.form.get("exercise_four_modifier_one")
        workout.exercise_four_modifier_two = request.form.get("exercise_four_modifier_two")
        workout.exercise_four_modifier_three = request.form.get("exercise_four_modifier_three")
        workout.exercise_four_total_one = float(request.form.get("exercise_four_total_one"))
        workout.exercise_four_total_two = float(request.form.get("exercise_four_total_two"))
        workout.exercise_four_total_three = float(request.form.get("exercise_four_total_three"))
        workout.exercise_five_name = request.form.get("exercise_five_name")
        workout.exercise_five_category = request.form.get("exercise_five_category")
        workout.exercise_five_modifier_one = request.form.get("exercise_five_modifier_one")
        workout.exercise_five_modifier_two = request.form.get("exercise_five_modifier_two")
        workout.exercise_five_modifier_three = request.form.get("exercise_five_modifier_three")
        workout.exercise_five_total_one = float(request.form.get("exercise_five_total_one"))
        workout.exercise_five_total_two = float(request.form.get("exercise_five_total_two"))
        workout.exercise_five_total_three = float(request.form.get("exercise_five_total_three"))
        workout.exercise_six_name = request.form.get("exercise_six_name")
        workout.exercise_six_category = request.form.get("exercise_six_category")
        workout.exercise_six_modifier_one = request.form.get("exercise_six_modifier_one")
        workout.exercise_six_modifier_two = request.form.get("exercise_six_modifier_two")
        workout.exercise_six_modifier_three = request.form.get("exercise_six_modifier_three")
        workout.exercise_six_total_one = float(request.form.get("exercise_six_total_one"))
        workout.exercise_six_total_two = float(request.form.get("exercise_six_total_two"))
        workout.exercise_six_total_three = float(request.form.get("exercise_six_total_three"))
        workout.exercise_seven_name = request.form.get("exercise_seven_name")
        workout.exercise_seven_category = request.form.get("exercise_seven_category")
        workout.exercise_seven_modifier_one = request.form.get("exercise_seven_modifier_one")
        workout.exercise_seven_modifier_two = request.form.get("exercise_seven_modifier_two")
        workout.exercise_seven_modifier_three = request.form.get("exercise_seven_modifier_three")
        workout.exercise_seven_total_one = float(request.form.get("exercise_seven_total_one"))
        workout.exercise_seven_total_two = float(request.form.get("exercise_seven_total_two"))
        workout.exercise_seven_total_three = float(request.form.get("exercise_seven_total_three"))
        workout.exercise_eight_name = request.form.get("exercise_eight_name")
        workout.exercise_eight_category = request.form.get("exercise_eight_category")
        workout.exercise_eight_modifier_one = request.form.get("exercise_eight_modifier_one")
        workout.exercise_eight_modifier_two = request.form.get("exercise_eight_modifier_two")
        workout.exercise_eight_modifier_three = request.form.get("exercise_eight_modifier_three")
        workout.exercise_eight_total_one = float(request.form.get("exercise_eight_total_one"))
        workout.exercise_eight_total_two = float(request.form.get("exercise_eight_total_two"))
        workout.exercise_eight_total_three = float(request.form.get("exercise_eight_total_three"))
        workout.exercise_nine_name = request.form.get("exercise_nine_name")
        workout.exercise_nine_category = request.form.get("exercise_nine_category")
        workout.exercise_nine_modifier_one = request.form.get("exercise_nine_modifier_one")
        workout.exercise_nine_modifier_two = request.form.get("exercise_nine_modifier_two")
        workout.exercise_nine_modifier_three = request.form.get("exercise_nine_modifier_three")
        workout.exercise_nine_total_one = float(request.form.get("exercise_nine_total_one"))
        workout.exercise_nine_total_two = float(request.form.get("exercise_nine_total_two"))
        workout.exercise_nine_total_three = float(request.form.get("exercise_nine_total_three"))
        workout.exercise_ten_name = request.form.get("exercise_ten_name")
        workout.exercise_ten_category = request.form.get("exercise_ten_category")
        workout.exercise_ten_modifier_one = request.form.get("exercise_ten_modifier_one")
        workout.exercise_ten_modifier_two = request.form.get("exercise_ten_modifier_two")
        workout.exercise_ten_modifier_three = request.form.get("exercise_ten_modifier_three")
        workout.exercise_ten_total_one = float(request.form.get("exercise_ten_total_one"))
        workout.exercise_ten_total_two = float(request.form.get("exercise_ten_total_two"))
        workout.exercise_ten_total_three = float(request.form.get("exercise_ten_total_three"))
        workout.additional_information = request.form.get("additional_information")
        is_public=bool(True if request.form.get("is-visible") else False)
        db.session.commit()
        is_public = "on" if request.form.get("is-visible") else "off"
        edited_mongo_workout = {
            "workout_title": request.form.get("workout_title"),
            "created_by": session["user"],
            "workout_date_time": request.form.get("workout_date_time"),
            "workout_location": request.form.get("workout_location"),
            "exercise_one_name": request.form.get("edit_exercise_one_name"),
            "exercise_one_category": request.form.get("edit_exercise_one_category"),
            "exercise_one_modifier_one": request.form.get("exercise_one_modifier_one"),
            "exercise_one_modifier_two":  request.form.get("exercise_one_modifier_two"),
            "exercise_one_modifier_three": request.form.get("exercise_one_modifier_three"),
            "exercise_one_total_one": float(request.form.get("exercise_one_total_one")),
            "exercise_one_total_two": float(request.form.get("exercise_one_total_two")),
            "exercise_one_total_three": float(request.form.get("exercise_one_total_three")),
            "exercise_two_name": request.form.get("exercise_two_name"),
            "exercise_two_category": request.form.get("exercise_two_category"),
            "exercise_two_modifier_one": request.form.get("exercise_two_modifier_one"),
            "exercise_two_modifier_two": request.form.get("exercise_two_modifier_two"),
            "exercise_two_modifier_three": request.form.get("exercise_two_modifier_three"),
            "exercise_two_total_one": float(request.form.get("exercise_two_total_one")),
            "exercise_two_total_two": float(request.form.get("exercise_two_total_two")),
            "exercise_two_total_three": float(request.form.get("exercise_two_total_three")),
            "exercise_three_name": request.form.get("exercise_three_name"),
            "exercise_three_category": request.form.get("exercise_three_category"),
            "exercise_three_modifier_one": request.form.get("exercise_three_modifier_one"),
            "exercise_three_modifier_two": request.form.get("exercise_three_modifier_two"),
            "exercise_three_modifier_three": request.form.get("exercise_three_modifier_three"),
            "exercise_three_total_one": float(request.form.get("exercise_three_total_one")),
            "exercise_three_total_two": float(request.form.get("exercise_three_total_two")),
            "exercise_three_total_three": float(request.form.get("exercise_three_total_three")),
            "exercise_four_name": request.form.get("exercise_four_name"),
            "exercise_four_category": request.form.get("exercise_four_category"),
            "exercise_four_modifier_one": request.form.get("exercise_four_modifier_one"),
            "exercise_four_modifier_two": request.form.get("exercise_four_modifier_two"),
            "exercise_four_modifier_three": request.form.get("exercise_four_modifier_three"),
            "exercise_four_total_one": float(request.form.get("exercise_four_total_one")),
            "exercise_four_total_two": float(request.form.get("exercise_four_total_two")),
            "exercise_four_total_three": float(request.form.get("exercise_four_total_three")),
            "exercise_five_name": request.form.get("exercise_five_name"),
            "exercise_five_category": request.form.get("exercise_five_category"),
            "exercise_five_modifier_one": request.form.get("exercise_five_modifier_one"),
            "exercise_five_modifier_two": request.form.get("exercise_five_modifier_two"),
            "exercise_five_modifier_three": request.form.get("exercise_five_modifier_three"),
            "exercise_five_total_one": float(request.form.get("exercise_five_total_one")),
            "exercise_five_total_two": float(request.form.get("exercise_five_total_two")),
            "exercise_five_total_three": float(request.form.get("exercise_five_total_three")),
            "exercise_six_name": request.form.get("exercise_six_name"),
            "exercise_six_category": request.form.get("exercise_six_category"),
            "exercise_six_modifier_one": request.form.get("exercise_six_modifier_one"),
            "exercise_six_modifier_two": request.form.get("exercise_six_modifier_two"),
            "exercise_six_modifier_three": request.form.get("exercise_six_modifier_three"),
            "exercise_six_total_one": float(request.form.get("exercise_six_total_one")),
            "exercise_six_total_two": float(request.form.get("exercise_six_total_two")),
            "exercise_six_total_three": float(request.form.get("exercise_six_total_three")),
            "exercise_seven_name": request.form.get("exercise_seven_name"),
            "exercise_seven_category": request.form.get("exercise_seven_category"),
            "exercise_seven_modifier_one": request.form.get("exercise_seven_modifier_one"),
            "exercise_seven_modifier_two": request.form.get("exercise_seven_modifier_two"),
            "exercise_seven_modifier_three": request.form.get("exercise_seven_modifier_three"),
            "exercise_seven_total_one": float(request.form.get("exercise_seven_total_one")),
            "exercise_seven_total_two": float(request.form.get("exercise_seven_total_two")),
            "exercise_seven_total_three": float(request.form.get("exercise_seven_total_three")),
            "exercise_eight_name": request.form.get("exercise_eight_name"),
            "exercise_eight_category": request.form.get("exercise_eight_category"),
            "exercise_eight_modifier_one": request.form.get("exercise_eight_modifier_one"),
            "exercise_eight_modifier_two": request.form.get("exercise_eight_modifier_two"),
            "exercise_eight_modifier_three": request.form.get("exercise_eight_modifier_three"),
            "exercise_eight_total_one": float(request.form.get("exercise_eight_total_one")),
            "exercise_eight_total_two": float(request.form.get("exercise_eight_total_two")),
            "exercise_eight_total_three": float(request.form.get("exercise_eight_total_three")),
            "exercise_nine_name": request.form.get("exercise_nine_name"),
            "exercise_nine_category": request.form.get("exercise_nine_category"),
            "exercise_nine_modifier_one": request.form.get("exercise_nine_modifier_one"),
            "exercise_nine_modifier_two": request.form.get("exercise_nine_modifier_two"),
            "exercise_nine_modifier_three": request.form.get("exercise_nine_modifier_three"),
            "exercise_nine_total_one": float(request.form.get("exercise_nine_total_one")),
            "exercise_nine_total_two": float(request.form.get("exercise_nine_total_two")),
            "exercise_nine_total_three": float(request.form.get("exercise_nine_total_three")),
            "exercise_ten_name": request.form.get("exercise_ten_name"),
            "exercise_ten_category": request.form.get("exercise_ten_category"),
            "exercise_ten_modifier_one":  request.form.get("exercise_ten_modifier_one"),
            "exercise_ten_modifier_two": request.form.get("exercise_ten_modifier_two"),
            "exercise_ten_modifier_three": request.form.get("exercise_ten_modifier_three"),
            "exercise_ten_total_one": float(request.form.get("exercise_ten_total_one")),
            "exercise_ten_total_two": float(request.form.get("exercise_ten_total_two")),
            "exercise_ten_total_three": float(request.form.get("exercise_ten_total_three")),
            "additional_information": request.form.get("additional_information"),
            "is_public": is_public,
            "is_edited": True,
            
        }
        mongo.db.workouts.insert_one(edited_mongo_workout)
        return redirect(url_for("workouts"))        
    return render_template("edit_workout.html", workout=workout, modifiers=modifiers, categories=categories, exercises=exercises)


@app.route("/delete_workout/<int:workout_id>")
def delete_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    db.session.delete(workout)
    db.session.commit()
    return redirect(url_for("workouts"))

@app.route("/quick_start", methods=["GET", "POST"])
def quick_start():
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises = list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    if request.method == "POST":
        workout = Workout(
            created_by = session["user"],
            workout_title = request.form.get("workout_title"),
            workout_date_time = request.form.get("workout_date_time"),
            workout_location = request.form.get("workout_location"),
            exercise_one_name = request.form.get("mobile_exercise_one_name"),
            exercise_one_category = request.form.get("mobile_exercise_one_category"),
            exercise_one_modifier_one = request.form.get("exercise_one_modifier_one"),
            exercise_one_modifier_two = request.form.get("exercise_one_modifier_two"),
            exercise_one_modifier_three = request.form.get("exercise_one_modifier_three"),
            exercise_one_total_one = float(request.form.get("exercise_one_total_one")),
            exercise_one_total_two = float(request.form.get("exercise_one_total_two")),
            exercise_one_total_three = float(request.form.get("exercise_one_total_three")),
            is_mobile=bool(True),
        )
        db.session.add(workout)
        db.session.commit()
        return redirect(url_for("quick_add"))
    return render_template("quick_start.html", categories=categories, exercises=exercises, modifiers=modifiers, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_add")
def quick_add():
    workouts = list(Workout.query.order_by(Workout.workout_date_time).all())
    return render_template("quick_add.html", workouts=workouts)


@app.route("/quick_edit/<workout_id>", methods=["GET", "POST"])
def quick_edit(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_two_name = request.form.get("mobile_exercise_two_name"),
        workout.exercise_two_category = request.form.get("mobile_exercise_two_category"),
        workout.exercise_two_modifier_one = request.form.get("exercise_two_modifier_one"),
        workout.exercise_two_modifier_two = request.form.get("exercise_two_modifier_two"),
        workout.exercise_two_modifier_three = request.form.get("exercise_two_modifier_three"),
        workout.exercise_two_total_one = float(request.form.get("exercise_two_total_one")),
        workout.exercise_two_total_two = float(request.form.get("exercise_two_total_two")),
        workout.exercise_two_total_three = float(request.form.get("exercise_two_total_three")),
        db.session.commit()
        return render_template("quick_edit_2.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_2/<workout_id>", methods=["GET", "POST"])
def quick_edit_two(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_three_name = request.form.get("mobile_exercise_three_name"),
        workout.exercise_three_category = request.form.get("mobile_exercise_three_category"),
        workout.exercise_three_modifier_one = request.form.get("exercise_three_modifier_one"),
        workout.exercise_three_modifier_two = request.form.get("exercise_three_modifier_two"),
        workout.exercise_three_modifier_three = request.form.get("exercise_three_modifier_three"),
        workout.exercise_three_total_one = float(request.form.get("exercise_three_total_one")),
        workout.exercise_three_total_two = float(request.form.get("exercise_three_total_two")),
        workout.exercise_three_total_three = float(request.form.get("exercise_three_total_three")),
        db.session.commit()
        return render_template("quick_edit_3.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_2.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_3/<workout_id>", methods=["GET", "POST"])
def quick_edit_three(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_four_name = request.form.get("mobile_exercise_four_name"),
        workout.exercise_four_category = request.form.get("mobile_exercise_four_category"),
        workout.exercise_four_modifier_one = request.form.get("exercise_four_modifier_one"),
        workout.exercise_four_modifier_two = request.form.get("exercise_four_modifier_two"),
        workout.exercise_four_modifier_three = request.form.get("exercise_four_modifier_three"),
        workout.exercise_four_total_one = float(request.form.get("exercise_four_total_one")),
        workout.exercise_four_total_two = float(request.form.get("exercise_four_total_two")),
        workout.exercise_four_total_three = float(request.form.get("exercise_four_total_three")),
        db.session.commit()
        return render_template("quick_edit_4.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_3.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_4/<workout_id>", methods=["GET", "POST"])
def quick_edit_four(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_five_name = request.form.get("mobile_exercise_five_name"),
        workout.exercise_five_category = request.form.get("mobile_exercise_five_category"),
        workout.exercise_five_modifier_one = request.form.get("exercise_five_modifier_one"),
        workout.exercise_five_modifier_two = request.form.get("exercise_five_modifier_two"),
        workout.exercise_five_modifier_three = request.form.get("exercise_five_modifier_three"),
        workout.exercise_five_total_one = float(request.form.get("exercise_five_total_one")),
        workout.exercise_five_total_two = float(request.form.get("exercise_five_total_two")),
        workout.exercise_five_total_three = float(request.form.get("exercise_five_total_three")),
        db.session.commit()
        return render_template("quick_edit_5.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_4.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_5/<workout_id>", methods=["GET", "POST"])
def quick_edit_five(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_six_name = request.form.get("mobile_exercise_six_name"),
        workout.exercise_six_category = request.form.get("mobile_exercise_six_category"),
        workout.exercise_six_modifier_one = request.form.get("exercise_six_modifier_one"),
        workout.exercise_six_modifier_two = request.form.get("exercise_six_modifier_two"),
        workout.exercise_six_modifier_three = request.form.get("exercise_six_modifier_three"),
        workout.exercise_six_total_one = float(request.form.get("exercise_six_total_one")),
        workout.exercise_six_total_two = float(request.form.get("exercise_six_total_two")),
        workout.exercise_six_total_three = float(request.form.get("exercise_six_total_three")),
        db.session.commit()
        return render_template("quick_edit_6.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_5.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_6/<workout_id>", methods=["GET", "POST"])
def quick_edit_six(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_seven_name = request.form.get("mobile_exercise_seven_name"),
        workout.exercise_seven_category = request.form.get("mobile_exercise_seven_category"),
        workout.exercise_seven_modifier_one = request.form.get("exercise_seven_modifier_one"),
        workout.exercise_seven_modifier_two = request.form.get("exercise_seven_modifier_two"),
        workout.exercise_seven_modifier_three = request.form.get("exercise_seven_modifier_three"),
        workout.exercise_seven_total_one = float(request.form.get("exercise_seven_total_one")),
        workout.exercise_seven_total_two = float(request.form.get("exercise_seven_total_two")),
        workout.exercise_seven_total_three = float(request.form.get("exercise_seven_total_three")),
        db.session.commit()
        return render_template("quick_edit_7.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_6.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_7/<workout_id>", methods=["GET", "POST"])
def quick_edit_seven(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_eight_name = request.form.get("mobile_exercise_eight_name"),
        workout.exercise_eight_category = request.form.get("mobile_exercise_eight_category"),
        workout.exercise_eight_modifier_one = request.form.get("exercise_eight_modifier_one"),
        workout.exercise_eight_modifier_two = request.form.get("exercise_eight_modifier_two"),
        workout.exercise_eight_modifier_three = request.form.get("exercise_eight_modifier_three"),
        workout.exercise_eight_total_one = float(request.form.get("exercise_eight_total_one")),
        workout.exercise_eight_total_two = float(request.form.get("exercise_eight_total_two")),
        workout.exercise_eight_total_three = float(request.form.get("exercise_eight_total_three")),
        db.session.commit()
        return render_template("quick_edit_8.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_7.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_8/<workout_id>", methods=["GET", "POST"])
def quick_edit_eight(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_nine_name = request.form.get("mobile_exercise_nine_name"),
        workout.exercise_nine_category = request.form.get("mobile_exercise_nine_category"),
        workout.exercise_nine_modifier_one = request.form.get("exercise_nine_modifier_one"),
        workout.exercise_nine_modifier_two = request.form.get("exercise_nine_modifier_two"),
        workout.exercise_nine_modifier_three = request.form.get("exercise_nine_modifier_three"),
        workout.exercise_nine_total_one = float(request.form.get("exercise_nine_total_one")),
        workout.exercise_nine_total_two = float(request.form.get("exercise_nine_total_two")),
        workout.exercise_nine_total_three = float(request.form.get("exercise_nine_total_three")),
        db.session.commit()
        return render_template("quick_edit_9.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_8.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_9/<workout_id>", methods=["GET", "POST"])
def quick_edit_nine(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        workout.exercise_ten_name = request.form.get("mobile_exercise_ten_name"),
        workout.exercise_ten_category = request.form.get("mobile_exercise_ten_category"),
        workout.exercise_ten_modifier_one = request.form.get("exercise_ten_modifier_one"),
        workout.exercise_ten_modifier_two = request.form.get("exercise_ten_modifier_two"),
        workout.exercise_ten_modifier_three = request.form.get("exercise_ten_modifier_three"),
        workout.exercise_ten_total_one = float(request.form.get("exercise_ten_total_one")),
        workout.exercise_ten_total_two = float(request.form.get("exercise_ten_total_two")),
        workout.exercise_ten_total_three = float(request.form.get("exercise_ten_total_three")),
        db.session.commit()
        return render_template("quick_edit_10.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("quick_edit_9.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)

@app.route("/quick_edit_10/<workout_id>", methods=["GET", "POST"])
def quick_edit_ten(workout_id):
    mongo_categories = list(mongo.db.categories.find())
    mongo_exercises = list(mongo.db.exercises.find())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    categories = list(Category.query.order_by(Category.category_name).all())
    exercises =  list(Exercise.query.order_by(Exercise.exercise_title).all())
    modifiers = list(Modifier.query.order_by(Modifier.modifier_name).all())
    workout = Workout.query.get_or_404(workout_id)
    if request.method == "POST":
        additional_information = request.form.get("additional_information"),
        is_public=bool(True if request.form.get("is-visible") else False),
        db.session.commit()
        return render_template("quick_edit_10.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)
    return render_template("workouts.html", categories=categories, exercises=exercises, modifiers=modifiers, workouts=workouts, workout=workout, mongo_categories=mongo_categories, mongo_exercises=mongo_exercises)


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