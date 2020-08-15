from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("count-notif/", views.count_notif, name="count-notif"),
    path("info-notif/", views.info_notif, name="info-notif"),
    path("detail-info-notif/<str:id_request_form>/", views.detail_info_notif_by_id, name="detail-info-notif-by-id"),
]