"""
Question REST API, this module defines the following classes:
- `QuestionApi`, for getting all question and creating new one
- `QuestionApiParam`, for getting one question and updating
- `QuestionServiceApiParam`, for getting all questions about specific service
- `QuestionUserApiParam`, for getting all questions from specific user
"""
from flask_jwt import jwt_required, current_identity
from flask_restful import Resource, reqparse

from sorting_app.jwt import admin_rights_required
from sorting_app.models.question import Question
from sorting_app.models.service import Service
from sorting_app.models.user import User


class QuestionApi(Resource):
    """
    API endpoint servicing `/questions' for getting all question and creating new one
    """
    parser = reqparse.RequestParser()
    parser.add_argument('service_id',
                        type=int,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('question_text',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    @staticmethod
    def get():
        """
        Return all question for all services and users
        """
        questions = Question.query.all()
        return [question.to_dict() for question in questions], 200

    @jwt_required()
    def post(self):
        """
        creates new question
        only authorised users can add questions
        {
            'service_id': self.service_id,
            'question_text': self.question_text,
        }
        :returns created question in JSON format and save it in DB
        """
        user = current_identity
        data = QuestionApi.parser.parse_args()
        Service.query.get_or_404(data.service_id)
        new_question = Question(
            service_id=data['service_id'],
            user_id=user.id,
            question_text=data['question_text'],
        )
        new_question.save_to_db()
        return new_question.to_dict(), 201


class QuestionApiParam(Resource):
    """
    API endpoints servicing `/questions/<question_id>'
    """

    @staticmethod
    def get(question_id):
        """
        :return:  question with question_id
        """
        question = Question.query.get_or_404(question_id)  # if it does not exist error will be returned
        return question.to_dict(), 200

    @jwt_required()
    @admin_rights_required()
    def patch(self, question_id):
        """
        adds or change answer to question
        {
            'answer_text': self.answer_text
        }
        :return: updated question
        """
        question = Question.query.get_or_404(question_id)
        parser = reqparse.RequestParser()
        parser.add_argument('answer_text',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )
        data = parser.parse_args()
        question.answer_text = data['answer_text']
        question.save_to_db()
        return question.to_dict(), 200

    @jwt_required()
    @admin_rights_required()
    def put(self, question_id):
        """
        updates question
        {
            'question_text': self.question_text,
            'answer_text': self.answer_text
        }
        :return: updated question
        """
        question = Question.query.get_or_404(question_id)
        parser = reqparse.RequestParser()
        parser.add_argument('question_text',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )
        parser.add_argument('answer_text',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )
        data = parser.parse_args()
        question.question_text = data['question_text']
        question.answer_text = data['answer_text']
        question.save_to_db()
        return question.to_dict(), 200


class QuestionServiceApiParam(Resource):
    """
    API endpoints for servicing `/questions/service/<int:service_id>` which use parameters for question and service entity
    :returns array of question for specified service
    """

    @staticmethod
    def get(service_id):
        """
        :return: all question with answers for specified service
        """
        Service.query.get_or_404(service_id)  # if it does not exist error will be returned
        questions = Question.query.filter_by(service_id=service_id).all()
        return [question.to_dict() for question in questions], 200


class QuestionUserApiParam(Resource):
    """
    API endpoints for servicing `/questions/user/<int:service_id>`  which use parameters for question and user entity
    :returns array of question from specified user
    """

    @staticmethod
    def get(user_id):
        """
        :return: all question with answers from specified user
        """
        User.query.get_or_404(user_id)  # if it does not exist error will be returned
        questions = Question.query.filter_by(user_id=user_id).all()
        return [question.to_dict() for question in questions], 200
