import datetime
import os

import jwt

JWT_PRIVATE_KEY = os.environ.get('JWT_PRIVATE_KEY')


def generate_register_token(user_data, code):
    return jwt.encode({
        'code': code,
        'user_data': user_data,
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=15) - datetime.timedelta(hours=2),
        'iat': datetime.datetime.now(),
    }, JWT_PRIVATE_KEY)
