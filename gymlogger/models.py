from gymlogger import db

class Category(db.Model):
    # schema for the Category model
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(25), unique=True, nullable=False)
    tasks = db.relationship("Task", backref="category", cascade="all, delete", lazy=True)

    def __repr__(self):
        # __repr__ to represent itself in the form of a string
        return self.category_name

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return self.exercise_name 


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workout_title = db.Column(db.String(100), nullable=False)
    workout_date = db.Column(db.DateTime, nullable=False)
    is_public = db.Column(db.Boolean, default=True, nullable=False)

    def __repr__(self):
        return self
