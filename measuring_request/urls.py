from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="measuring-request"),
    path("count-notif-request/", views.notif_request_form, name="count-notif-request"),
]