from flask import jsonify, request
from app import db
from app.api import bp
from app.models import Student
from app.schemas import StudentSchema

# declare schema
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

# sanity check
@bp.route('/')
def index():
    return 'it works!'

@bp.route('/students', methods=['GET'])
def get_all_students():
    data = Student.query.all()
    students = students_schema.dump(data).data

    return jsonify({'students': students})


@bp.route('/students', methods=['POST'])
def create_student():
    student = student_schema.load(request.get_json()).data
    print(student)
    student.save()
    return jsonify({'student': student}), 201
    

@bp.route('/students/<id>', methods=['GET'])
def get_single_student():
    pass
    

@bp.route('/students/<id>', methods=['PUT'])
def update_student():
    pass
    

@bp.route('/students/<id>', methods=['DELETE'])
def delete_student():
    pass
    
