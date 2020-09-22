from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="task-management"),
    path("datapart/", views.datapart, name="data-part"),
    path("datamaterial/", views.datamaterial, name="data-material"),
    path("save-task-management/", views.save_task_management, name="save-task-management"),
    path("save-measurement-rubbers/", views.save_measurement_rubbers, name="save-measurement-rubbers"),
    path("get-task-management/", views.get_task_management, name="get-task-management"),
    path("get-detail-task/<int:id_task>/", views.get_detail_task, name="get-detail-task"),
    path("get-rubbers-tolerance/", views.rubbers_tolerance, name="get-rubbers-tolerance"),
    path("get-rubbers-tolerance/<int:id_rubber>/", views.rubbers_tolerance_by_id, name="tolerance-by-id"),
]