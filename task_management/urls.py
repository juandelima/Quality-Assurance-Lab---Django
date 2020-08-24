from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="task-management"),
    path("datapart/", views.datapart, name="data-part"),
    path("datamaterial/", views.datamaterial, name="data-material"),
    path("save-task-management/", views.save_task_management, name="save-task-management"),
    path("get-task-management/", views.get_task_management, name="get-task-management"),
]