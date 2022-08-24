from django.urls import path
from .views import account_create

urlpatterns = [
    path('create/', account_create)
]