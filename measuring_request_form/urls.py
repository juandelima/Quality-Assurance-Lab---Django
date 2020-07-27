from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="measuring-request-form"),
    path("measuringdatapart/", views.getdatapart, name="measuring-data-part"),
    path("measuringdatamaterial/", views.getmaterial, name="measuring-data-part"),
    path("applicantsandrecipients/", views.getEmployees, name="applicantsandrecipients"),
    path("insertemployees/", views.insertEmployees, name="insert-employees"),
    path("save-measuring-request-form/", views.saveRequestMeasuringForm, name="save-measuring"),
    path("view-email/", views.viewEmail, name="view-email"),
    path("<str:id>/", views.addSignature, name="edit-measuring"),
    path("update-measuring-request-form/<str:id>/", views.updateMeasuring, name="update-measuring"),
]