from django.db import models

# Create your models here.
class Users(models.Model):
    id_user = models.IntegerField(primary_key = True)
    nama_lengkap = models.CharField(max_length = 125)
    username = models.CharField(max_length=125)
    email = models.CharField(max_length=125)
    role = models.CharField(max_length=125)
    password = models.TextField()
    is_active = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_login = models.BooleanField()
    class Meta:
        db_table = 'user' 
        managed = False