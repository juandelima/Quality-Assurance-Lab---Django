from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("count-notif/", views.count_notif, name="count-notif"),
    path("info-notif/", views.info_notif, name="info-notif"),
]