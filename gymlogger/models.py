from gymlogger import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)

class Category(db.Model):
    # schema for the Category model
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(25), unique=True, nullable=False)
    exercises = db.relationship("Exercise", backref="category", cascade="all, delete", lazy=True)

    def __repr__(self):
        # __repr__ to represent itself in the form of a string
        return self.category_name

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_title = db.Column(db.String(100), unique=True, nullable=False)
    exercise_category = db.Column(db.Integer, db.ForeignKey("category.id", ondelete="CASCADE"), nullable=False)
    

    def __repr__(self):
        return self.exercise_title 

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(100), unique=True, nullable=False)

class Modifier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modifier_name = db.Column(db.String(100), unique=True, nullable=False)

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.String(100), nullable=False)
    workout_title = db.Column(db.String(200), nullable=False)
    workout_date_time = db.Column(db.DateTime, nullable=False)
    workout_location = db.Column(db.String(100), nullable=False)
    exercise_one_name = db.Column(db.String(100), nullable=False)
    exercise_one_category = db.Column(db.String(0), nullable=False)
    exercise_one_modifier_one = db.Column(db.String(50), nullable=False)
    exercise_one_modifier_two = db.Column(db.String(50), nullable=False)
    exercise_one_modifier_three = db.Column(db.String(50), nullable=False)
    exercise_one_total_one = db.Column(db.Float, nullable=False)
    exercise_one_total_two = db.Column(db.Float, nullable=False)
    exercise_one_total_three = db.Column(db.Float, nullable=False)
    exercise_two_name = db.Column(db.String(100))
    exercise_two_category = db.Column(db.String(50))
    exercise_two_modifier_one = db.Column(db.String(50))
    exercise_two_modifier_two = db.Column(db.String(50))
    exercise_two_modifier_three = db.Column(db.String(50))
    exercise_two_total_one = db.Column(db.Float)
    exercise_two_total_two = db.Column(db.Float)
    exercise_two_total_three = db.Column(db.Float)
    exercise_three_name = db.Column(db.String(100))
    exercise_three_category = db.Column(db.String(50))
    exercise_three_modifier_one = db.Column(db.String(50))
    exercise_three_modifier_two = db.Column(db.String(50))
    exercise_three_modifier_three = db.Column(db.String(50))
    exercise_three_total_one = db.Column(db.Float)
    exercise_three_total_two = db.Column(db.Float)
    exercise_three_total_three = db.Column(db.Float)
    exercise_four_name = db.Column(db.String(100))
    exercise_four_category = db.Column(db.String(50))
    exercise_four_modifier_one = db.Column(db.String(50))
    exercise_four_modifier_two = db.Column(db.String(50))
    exercise_four_modifier_three = db.Column(db.String(50))
    exercise_four_total_one = db.Column(db.Float)
    exercise_four_total_two = db.Column(db.Float)
    exercise_four_total_three = db.Column(db.Float)
    exercise_five_name = db.Column(db.String(100))
    exercise_five_category = db.Column(db.String(50))
    exercise_five_modifier_one = db.Column(db.String(50))
    exercise_five_modifier_two = db.Column(db.String(50))
    exercise_five_modifier_three = db.Column(db.String(50))
    exercise_five_total_one = db.Column(db.Float)
    exercise_five_total_two = db.Column(db.Float)
    exercise_five_total_three = db.Column(db.Float)
    exercise_six_name = db.Column(db.String(100))
    exercise_six_category = db.Column(db.String(50))
    exercise_six_modifier_one = db.Column(db.String(50))
    exercise_six_modifier_two = db.Column(db.String(50))
    exercise_six_modifier_three = db.Column(db.String(50))
    exercise_six_total_one = db.Column(db.Float)
    exercise_six_total_two = db.Column(db.Float)
    exercise_six_total_three = db.Column(db.Float)
    exercise_seven_name= db.Column(db.String(100))
    exercise_seven_category = db.Column(db.String(50))
    exercise_seven_modifier_one = db.Column(db.String(50))
    exercise_seven_modifier_two = db.Column(db.String(50))
    exercise_seven_modifier_three = db.Column(db.String(50))
    exercise_seven_total_one = db.Column(db.Float)
    exercise_seven_total_two = db.Column(db.Float)
    exercise_seven_total_three = db.Column(db.Float)
    exercise_eight_name = db.Column(db.String(100))
    exercise_eight_category = db.Column(db.String(50))
    exercise_eight_modifier_one = db.Column(db.String(50))
    exercise_eight_modifier_two = db.Column(db.String(50))
    exercise_eight_modifier_three = db.Column(db.String(50))
    exercise_eight_total_one = db.Column(db.Float)
    exercise_eight_total_two = db.Column(db.Float)
    exercise_eight_total_three = db.Column(db.Float)
    exercise_nine_name = db.Column(db.String(100))
    exercise_nine_category = db.Column(db.String(50))
    exercise_nine_modifier_one = db.Column(db.String(50))
    exercise_nine_modifier_two = db.Column(db.String(50))
    exercise_nine_modifier_three = db.Column(db.String(50))
    exercise_nine_total_one = db.Column(db.Float)
    exercise_nine_total_two = db.Column(db.Float)
    exercise_nine_total_three = db.Column(db.Float)
    exercise_ten_name= db.Column(db.String(100))
    exercise_ten_category = db.Column(db.String(50))
    exercise_ten_modifier_one = db.Column(db.String(50))
    exercise_ten_modifier_two = db.Column(db.String(50))
    exercise_ten_modifier_three = db.Column(db.String(50))
    exercise_ten_total_one = db.Column(db.Float)
    exercise_ten_total_two = db.Column(db.Float)
    exercise_ten_total_three = db.Column(db.Float)
    additional_information = db.Column(db.String(200))
    is_public = db.Column(db.Boolean, default=True)
    is_mobile = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return self