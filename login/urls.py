from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="login-form"),
    path("user-login/", views.userLogin, name="login-user"),
    path("user-logout/", views.userLogout, name="logout-user"),
    path("insert-admin/", views.insert_admin, name="insert"),
]