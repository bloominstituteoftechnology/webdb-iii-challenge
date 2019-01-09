from app import ma

class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student