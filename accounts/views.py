from knox.models import AuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.serializers import LoginSerializer, UserSerializer


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
