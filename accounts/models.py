import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migration = True

    def _create_user(self, email, password, **extra):
        if not email:
            raise ValueError("email is required!")
        if not password:
            raise ValueError("Password cannot be empty!")
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra):
        extra['is_staff'] = False
        extra['is_superuser'] = False
        return self._create_user(email, password, **extra)

    def create_superuser(self, email, password, **extra):
        extra['is_staff'] = True
        extra['is_superuser'] = True
        return self._create_user(email, password, **extra)


class Account(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)

    username = None

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email} - {self.full_name}"
