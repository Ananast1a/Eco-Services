import json

from flask import Response
from flask_restful import abort
from flask_sqlalchemy import BaseQuery
from flask_sqlalchemy import SQLAlchemy


class CustomBaseQuery(BaseQuery):
    def get_or_404(self, ident, description=None):
        rv = self.get(ident)
        if not rv:
            error_message = json.dumps(
                {
                    'message': "Model '" + self.column_descriptions[0].get("name") + "' with id " + str(
                        ident
                    ) + ' not found'
                }
            )
            abort(Response(error_message, 404, mimetype="application/json"))
        return rv


db = SQLAlchemy(query_class=CustomBaseQuery)
