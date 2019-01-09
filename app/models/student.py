from app import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=false)
    cohort_id = db.Column(db.Integer, ForeignKey('cohort.id'), nullable=False)

    def __repr__(self):
        return f'<Student {self.name}>'