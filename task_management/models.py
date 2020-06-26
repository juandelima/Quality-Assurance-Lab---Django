from django.db import models

class Customer(models.Model):
    id_customer = models.IntegerField(primary_key=True)
    nama_customer = models.CharField(max_length=125)
    class Meta:
        db_table = 'customer'
        managed = False

class DataPart(models.Model):
    id_part = models.IntegerField(primary_key=True)
    nama_part = models.CharField(max_length=125)
    type = models.CharField(max_length=6)
    id_customer = models.IntegerField(primary_key=False)
    class Meta:
        db_table = 'data_part'
        managed = False