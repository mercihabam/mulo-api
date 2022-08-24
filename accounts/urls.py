from django.urls import path, include

from accounts.views import login_view, get_logged_in_user

urlpatterns = [
    path('login', login_view),
    path('main', get_logged_in_user)
]
