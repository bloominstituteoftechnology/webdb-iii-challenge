from app import ma
from app.models import Cohort

class CohortSchema(ma.ModelSchema):
    class Meta:
        model = Cohort