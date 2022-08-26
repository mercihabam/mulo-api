import re
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from accounts.models import Account


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=Account.objects.all(),
                message="Email déjà utilisé"
            )
        ]
    )
    phone = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Account.objects.all(),
                message="Numéro de téléphone déjà utilisé"
            )
        ]
    )

    class Meta:
        model = Account
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True}
        }

    def validate(self, attrs: dict):
        pwd = attrs.get('password')
        if not re.match(r"^.*(?=.{8,})(?=.*\d)(?=.*[A-Za-z]).*$", pwd):
            raise serializers.ValidationError(
                {
                    'password': 'Le mot de passe doit contenir au moins 8 caracteres inclus les chiffres et les lettres'
                }
            )

        return attrs

    def create(self, validated_data: dict):
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        validated_data.setdefault('is_active', True)
        user = Account.objects.create_user(email=email, password=password, **validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user is None:
            raise serializers.ValidationError({"msg": "Incorrect credentials"})
        return user
