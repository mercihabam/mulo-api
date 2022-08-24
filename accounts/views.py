from django.shortcuts import render

# Create your views here.
from .models import Account
from .serializers import AccountSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .sendmail import *
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def account_create(request):
    if request.method == 'POST':
        serializer = AccountSerializer(data = request.data)

        if serializer.is_valid():
            make_password(request.data['password'])
            serializer.save()
            # generate_verify_mail(serializer.data['email'])
            return Response({
                'success': True, 
                'status': 201, 
                'message': 'Account created successfully', 
                'data':serializer.data})
        return Response({
            'success': False,
            'status': 400,
            'message': 'Account created failed please try again later',
            'data': serializer.errors})