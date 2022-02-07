import os
from dotenv import load_dotenv

from sorting_app import create_app

load_dotenv()  # take environment variables from .env.
app = create_app(os.environ.get('CONFIGURATION'))

if __name__ == '__main__':
    app.run()
