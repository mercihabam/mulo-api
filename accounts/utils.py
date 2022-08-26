import datetime
import os

import jwt
from rest_framework.response import Response

JWT_PRIVATE_KEY = os.environ.get('JWT_PRIVATE_KEY')


def generate_register_token(user_data, code):
    return jwt.encode({
        'code': code,
        'user_data': user_data,
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=15),
        'iat': datetime.datetime.now(),
    }, JWT_PRIVATE_KEY)


def decode_otp_token(view):
    """
    This function decode the OTP token and check if the otp provided by the user is correct.
    """

    def wrapper_func(request, *args, **kwargs):
        token = request.headers.get('otptoken', None) or request.headers.get('Otptoken', None)
        if token is None:
            return Response(status=400, data='OTP token is required')
        try:
            payload = jwt.decode(token, JWT_PRIVATE_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response(status=400, data='OTP token is expired')
        except jwt.InvalidTokenError:
            return Response(status=400, data='OTP token is invalid')
        provided_otp = request.data.get('otp', None)
        otp = payload.get('code', None)
        if str(provided_otp) != str(otp):
            return Response(status=400, data='OTP is invalid')
        request.user_id = payload.get('user_id', None)
        request.body = payload.get('user_data', None)
        return view(request, *args, **kwargs)

    return wrapper_func
