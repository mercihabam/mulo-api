from django.urls import path, include

from accounts.views import login_view

urlpatterns = [
    path('login', login_view)
]
