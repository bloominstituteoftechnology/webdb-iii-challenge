# RDBMS-API-Full Py-Style

To run after cloning the repo


Create your own virtual environment inside of the project directory
```
python3 -m venv venv
```

Activate the virtual environment
```
source venv/bin/activate 
```
(or windows equivalent)

then install requirements

```
pip install -r requirements.txt
```

then declare the flask app and run
```
export FLASK_APP=rdbms
```

This will set up an api server on at `localhost:5000`


It is optional to enter the vitual environment and then run
```
python rdbms.py
```

Though, this is probably less standard with a normal Flask app(I think)