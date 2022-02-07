_This is temp file for notes about process of creation and using of application it can be used for knowledge transfer_
# Table of contents
* [Major problems](#google-cloud)
* [Major problems](#major-problems)
* [Minor problems](#minor-problems)

# Google cloud

## Cloud SQL

We can  work from local computer with remote database.
* Read this for quick setup
[Quickstart for using the Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/postgres/quickstart-proxy-test)
* Read for info about connection from local [Connect using the Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/postgres/connect-admin-proxy) 
note that in pgAdmin `.s.PGSQL.5432` added automatically. 
`./cloud_sql_proxy -dir=/cloudsql &` to start up proxy
* Read for info about connection from App Engine (production) [Connecting from App Engine standard environment to Cloud SQL](https://cloud.google.com/sql/docs/postgres/connect-app-engine-standard)
  link format `postgresql+pg8000://<db_user>:<db_pass>@/<db_name>?unix_sock=<socket_path>/<cloud_sql_instance_name>/.s.PGSQL.5432`
* when deploy remember about `CONFIGURATION` in `.env` 
  * PROD use database from cloud code base cloud or local !!! set proper values in `app.yaml` and `.env`
  * DEV use database local code local set proper values in `.env`
  * TEST use database local code local
!!! great problem with `.env` in cloud because it mentioned in `.gitignore` it may not upload to cloud resolving of it get 2 hour

# Major problems
* I spend a lot of time to understand how to solve this *

## Error handlers restful api
in production environment exception are not pop to next level so if error happen in api it left there
and @app.errorhandler is for native flask restfull-api have not equivalent for this so logging of problems can 
be problematic, or we should turn on error propagation.
I spend 5 hours to find out information about this.

## JWT custom return 

@jwt.auth_response_handler change return of good authorization

@jwt.jwt_error_handler in production do not work if we use restfull-api in production





# Minor problems 
about not global task on that I spent a lot of time


## Problems with populate
The SQLAlchemy documentation on Importing all SQLAlchemy Models states in part:
 *However, due to the behavior of SQLAlchemy's "declarative" configuration mode, 
all modules which hold active SQLAlchemy models need to be imported before those 
models can successfully be used. So, if you use model classes with a declarative base, 
you need to figure out a way to get all your model modules imported to be able to use them 
in your application. *

Once I imported all the models (and relationships), the error about not finding the class name was resolved. 
Using and leaving populate in production should be removed.

<https://stackoverflow.com/questions/9088957/sqlalchemy-cannot-find-a-class-name>


## Configuration
### dotenv (.env)

We use python-dotenv [repo](https://github.com/theskumar/python-dotenv#getting-started) 
main aspects 
- * By default, `load_dotenv` doesn't override existing environment variables.*
- type of environments we can find in `./app/config.py`
- file .env should be placed in `./app`

### database connection local case
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_SERVER/POSTGRES_DATABASE'
it is bad to store credentials in code we should use dotenv and configurations!!!
I propose use Flask Factory pattern is good solution

We had cycle dependency in db read <https://www.reddit.com/r/flask/comments/a7vc3o/need_help_fixing_flask_db_circular_import_error/> that was removed
