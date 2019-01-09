from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from config import Config


# initialize the app and all of its dependencies
app = Flask(__name__)

app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)  # Marshmallow is required to serialize and deserialize our data

@app.before_first_request
def create_tables():
    db.create_all()

from app.api import bp as bp_api
app.register_blueprint(bp_api, url_prefix='/api')


# the following method allows the user to run 'python rdbms.py' from within the venv
if __name__ == '__main__':
    db.init_app(app)
    ma.init_app(app)
    app.run()