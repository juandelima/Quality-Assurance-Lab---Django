from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="measuring-request-form"),
    path("measuringdatapart/", views.getdatapart, name="measuring-data-part"),
]