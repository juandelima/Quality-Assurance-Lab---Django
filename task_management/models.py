from django.db import models

class Customer(models.Model):
    id_customer = models.IntegerField(primary_key=True)
    nama_customer = models.CharField(max_length=125)
    class Meta:
        db_table = 'customer'
        managed = False

class Vendor(models.Model):
    code_vendor = models.CharField(max_length=15, primary_key=True)
    vendor_name = models.CharField(max_length=225)
    class Meta:
        db_table = 'vendor'
        managed = False

class Material(models.Model):
    material_code = models.CharField(max_length=20, primary_key=True)
    material_name = models.CharField(max_length=225)
    code_vendor = models.CharField(max_length=15)
    class Meta:
        db_table = 'material'
        managed = False

class DataPart(models.Model):
    id_part = models.IntegerField(primary_key=True)
    nama_part = models.CharField(max_length=125)
    type = models.CharField(max_length=6)
    id_customer = models.IntegerField(primary_key=False)
    class Meta:
        db_table = 'data_part'
        managed = False