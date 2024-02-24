from rest_framework.views import exception_handler
from rest_framework.response import Response
from api.models import tokenModel


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and response.status_code == 403: # and 'token' in response.data:
        response.data = {'error': 'token is invalid.'}

    return response
