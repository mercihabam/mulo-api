import random

from knox.models import AuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.serializers import LoginSerializer, UserSerializer
from accounts.utils import generate_register_token
from utils.mail.send_register_code import send_register_code_mail


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = UserSerializer(serializer.validated_data)
    token = AuthToken.objects.create(serializer.validated_data)
    return Response(status=200, data={
        'token': token[1],
        'uer': user.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_user(request):
    serializer = UserSerializer(request.user)
    return Response(status=200, data=serializer.data)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    otp = random.randint(10000, 99999)
    token = generate_register_token(serializer.data, otp)
    send_register_code_mail(serializer.data, otp)
    return Response(token)
