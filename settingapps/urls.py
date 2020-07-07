from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('dashboard.urls')),
    path('task-management/', include('task_management.urls')),
    path("measuring-request-form/", include('measuring_request_form.urls')),
    path('login/', include('login.urls')),
]
