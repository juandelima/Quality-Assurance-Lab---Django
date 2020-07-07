from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="measuring-request-form"),
    path("measuringdatapart/", views.getdatapart, name="measuring-data-part"),
    path("measuringdatamaterial/", views.getmaterial, name="measuring-data-part"),
    path("applicantsandrecipients/", views.getEmployees, name="applicantsandrecipients"),
    path("insertemployees/", views.insertEmployees, name="insert-employees"),
]