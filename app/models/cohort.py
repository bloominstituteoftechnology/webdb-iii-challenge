from app import db

class Cohort(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    students = db.relationship('Student', backref='student', lazy=dynamic)

    def __repr__(self)
        return f'<Cohort {self.name}>'