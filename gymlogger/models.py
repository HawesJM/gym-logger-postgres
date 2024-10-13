from gymlogger import db

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
