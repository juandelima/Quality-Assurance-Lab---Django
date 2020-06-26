from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="task-management"),
    path("datapart/", views.datapart, name="data-part"),
]