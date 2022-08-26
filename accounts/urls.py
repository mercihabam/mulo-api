from django.urls import path
from knox.views import LogoutView, LogoutAllView

from accounts.views import login_view, get_logged_in_user, register

urlpatterns = [
    path('login', login_view),
    path('main', get_logged_in_user),
    path('logout', LogoutView.as_view()),
    path('logout_all', LogoutAllView.as_view()),
    path('register', register)
]
