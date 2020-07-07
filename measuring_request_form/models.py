from django.db import models

# Create your models here.
class Customer(models.Model):
    id_customer = models.IntegerField(primary_key = True)
    nama_customer = models.CharField(max_length=125)
    class Meta:
        db_table = 'customer'
        managed = False
    

class Vendor(models.Model):
    code_vendor = models.CharField(max_length=15, primary_key = True)
    vendor_name = models.CharField(max_length=225)
    class Meta:
        db_table = 'vendor'
        managed = False


class Material(models.Model):
    material_code = models.CharField(max_length=20, primary_key = True)
    material_name = models.CharField(max_length=225)
    code_vendor = models.CharField(max_length=15)
    class Meta:
        db_table = 'material'
        managed = False


class DataPart(models.Model):
    id_part = models.IntegerField(primary_key = True)
    no_sap = models.CharField(max_length=125)
    nama_part = models.CharField(max_length=50)
    type = models.CharField(max_length=6)
    proses = models.CharField(max_length=5)
    id_customer = models.IntegerField(primary_key = False)
    class Meta:
        db_table = 'data_part' 
        managed = False


class Departemen(models.Model):
    dept_code = models.CharField(max_length=7, primary_key = True)
    dept_name = models.CharField(max_length=30)
    class Meta:
        db_table = 'departemen'
        managed = False


class Employee(models.Model):
    id_employee = models.IntegerField(primary_key = True)
    nama = models.CharField(max_length=125)
    nrp = models.CharField(max_length=10)
    jabatan = models.CharField(max_length=45)
    dept_code = models.CharField(max_length=7)
    class Meta:
        db_table = 'employees'
        managed = False