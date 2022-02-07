# Backend part of WhiteTeam GPEC 2021
# Table of content
* [Python installation](#python-installation)
* [Database installation](#database-installation)
* [OpenApi (Swagger)](#openapi-json-description)
* [Testing](#testing)

# Installation of backend for local development
## Python installation
1. install on your system Python 3.9.* [Python download](https://www.python.org/downloads/). 
Please read carefully instruction for yor OS. Note that name of python executable on different OS can 
be different it can be just `python` in windows 'python3' in macOS or Linux please read documentation.
2. From root folder of project goto to backend folder `cd backend`
3. Create virtual environment in backend folder 'python -m venv venv'. This is needed for isolation project from others.
If you are frontend developer please ask help from backend team, if you have problems with this step. 
4. Activate environment 'venv\Scripts\active' in Windows `. venv/bin/activate`  in macOS/Linux. Note in IDE usually 
exist support of using venv please read documentation of your IDE.
5. Goto to folder `backend` and run command `pip install -r requirements.txt`
   (made this step every time when backend dependencies are changed)
6. install database PostgreSQL (see section below) and create database
7. For local development copy file `./app/.env.example` to `./app/.env` **never add .env to git** set proper value for
`LOCAL_SQL_USERNAME`, `LOCAL_SQL_PASSWORD`, `LOCAL_SQL_DATABASE_NAME_DEV`, `LOCAL_SQL_DATABASE_HOST_DEV`, `LOCAL_SQL_DATABASE_PORT_DEV`
and set `CONFIGURATION` to `PROD`
8. This step only for backend developers for production deploy to google cloud copy file `app.yaml.example` to `app.yaml` set proper values
and install  google cloud SDK basic usage to init `gcloud app init` to deploy on cloud `gcloud app browse` read more about cloud in NotesForDeveloper.md
9. **run backend part of application in folder `backend` execute command `python wsgi.py`** also you may use `gunicorn --bind 0.0.0.0:5000 wsgi:app`
10. To test API send GET request to <http://localhost:5000/api/v1/status>
11. To test JWT (login functionality) GET request to <http://localhost:5000/api/v1/secret>
12. Got to `/api/v1/register` and give JSON with user data [see](#login-information-temp) **remember 
user with id 1 have admin rights**  that user can create new services, edit them, add answer to questions.


## Database installation
*You can omit this step and set `SQLALCHEMY_DATABASE_URI=sqlite:///eco_dev.db`*
1. visit the download section on the PostgreSQL website at <https://www.postgresql.org/download/>
 and follow the instructions for the specific platform.
2. optionally only for convenience visit the download section on the pgAdmin website at 
<https://www.pgadmin.org/download/> and follow the instructions for the specific platform.
3. Create database `eco_dev` for development `eco_test` for testing remember user and password use this
information to change SQLALCHEMY_DATABASE_URI see above

The form of the URI is:
```
dialect+driver://username:password@host:port/database
```
in our case we use PostgreSQL
 ```
   SQLALCHEMY_DATABASE_URI_DEV = 'postgresql+psycopg2://user:password@localhost:port/eco_dev'
 ```
Where:
- `user` - your postgres username, by default - postgres
- `password` - your postgres user password
- `port` - server connection port, typically - 5432

Please do next step only after you install PostegreSQL and chane default SQLALCHEMY_DATABASE_URI for this proper
values in `.env` are needed

* create a migration repository `flask db init` add a migrations folder to your application 
The contents of this folder need to be added to version control along with your other source files
* generate an initial migration `flask db migrate -m "Initial migration."` migration script also needs to be added 
to version control
* apply the migration to the database `flask db upgrade`
* each time the database models change repeat the `migrate` and `upgrade` commands
[flask migrate](https://flask-migrate.readthedocs.io/en/latest/index.html)



## OpenAPi JSON description
1. run backend part of application in folder `backend` execute command `python wsgi.py`
2. visit url [http://localhost:5000/api/v1/docs](http://localhost:5000/api/v1/docs).
3. temporary we give access for part of OPENAPI for convenience of jury <https://flawless-energy-335218.appspot.com/api/v1/docs/> 

For developers if you change somehow behavior of API please made proper changes in /static/openapi.yaml you may study those resources. 
- [Specification about OpenAPI (Swagger)](https://swagger.io/specification/)
- [First 2 part of course 'Buildings APIs with Swagger and the OpenAPI Specification'](https://www.linkedin.com/learning/building-apis-with-swagger-and-the-openapi-specification/building-apis-with-swagger?u=2113185)


## Testing
* to run test of backend part `python -m unittest` from `backend` folder
* to calculate coverage ` coverage run -m unittest` from `backend` folder and then `coverage report` current level 80%

## login information temp

to register send POST to <http://127.0.0.1:5000/api/v1/register> with JSON ```{
    "username": "dan",
    "email": "test@mail.loc",
    "password": "12345"
}``` 

To authorise send POST to <http://127.0.0.1:5000/api/v1/login> with JSON ```{
    "username": "dan",
    "password": "12345"
}```  and if correct you get access token (JWT)

To test set GET  request to <http://localhost:5000/api/v1/secret> and you will get error
but if you send GET in header property `Authorization` with value `JWT token` (JWT space and then token you will get 
hidden message)
