from flask import jsonify, request
from app import db
from app.api import bp
from app.models import Cohort
from app.schemas import CohortSchema

# declare schema
cohort_schema = CohortSchema()
cohorts_schema = CohortSchema(many=True)


@bp.route('/cohorts', methods=['GET'])
def get_all_cohorts():
    data = Cohort.query.all()
    cohorts = cohorts_schema.dump(data).data

    return jsonify({'cohorts': cohorts})


@bp.route('/cohorts', methods=['POST'])
def create_cohort():
    cohort = cohort_schema.load(request.get_json()).data
    cohort.save()
    cohort = cohort_schema.dump(cohort).data
    return jsonify({'cohort': cohort}), 201
    

@bp.route('/cohorts/<id>', methods=['GET'])
def get_single_cohort():
    pass
    

@bp.route('/cohorts/<id>', methods=['PUT'])
def update_cohort():
    pass
    

@bp.route('/cohorts/<id>', methods=['DELETE'])
def delete_cohort():
    pass
    
