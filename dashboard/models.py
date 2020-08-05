from django.db import models

# Create your models here.
class Notification(models.Model):
    id_notif = models.IntegerField(primary_key=True)
    id_request_form = models.CharField(max_length=12)
    is_read = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    info_notif = models.TextField()
    class Meta:
        db_table = 'notification_request_form'
        managed = False