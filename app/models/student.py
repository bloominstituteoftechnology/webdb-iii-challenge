from app import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.id'), nullable=False)

    def __repr__(self):
        return f'<Student {self.name} - cohort is {self.cohort_id}>'

    def save(self):
        db.session.add(self)
        db.session.commit()