from app import ma
from app.models import Student

class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student