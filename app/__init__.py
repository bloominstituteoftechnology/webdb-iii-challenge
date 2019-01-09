from flask import Flask
from flask-sqlalchemy import SQLAlchemy
from flask-migrate import Migrate
from flask-marshmallow import Marshmallow
from app.api import bp
from config import Config


# initialize the app and all of its dependencies
app = Flask(__name__)

app.config.from_object(config)
db = SQLAlchemy(app)
ma = Marshmallow(app)  # Marshmallow is required to serialize and deserialize our data
migrate = Migrate(app, db)


app.register_blueprint(bp, url_prefix='/api')

# the following method allows the user to run 'python rdbms.py' from within the venv
if __name__ == '__main__':
    app.run()