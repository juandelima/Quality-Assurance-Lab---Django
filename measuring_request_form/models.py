from django.contrib.postgres.fields import ArrayField
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
    email = models.CharField(max_length=125)
    class Meta:
        db_table = 'employees'
        managed = False


class MeasuringForm(models.Model):
    id_request = models.CharField(max_length=12, primary_key = True)
    id_part = models.CharField(max_length=20)
    address = models.TextField()
    qty_cavity = models.IntegerField()
    qty_part = models.IntegerField()
    complementary_documents = ArrayField(models.CharField(max_length=200), blank=True)
    part_status = ArrayField(models.CharField(max_length=200), blank=True)
    measuring_request = ArrayField(models.CharField(max_length=200), blank=True)
    testing_request = ArrayField(models.CharField(max_length=200), blank=True)
    note = models.TextField()
    id_applicant_staff = models.IntegerField()
    id_applicant_spv = models.IntegerField()
    id_recipient_lab_staff = models.IntegerField()
    id_recipient_lab_spv = models.IntegerField()
    receiving_date = models.DateField(auto_now=False, auto_now_add=False)
    receiving_time = models.TimeField(auto_now=False, auto_now_add=False)
    shift = models.IntegerField()
    testing_start_date = models.DateField(auto_now=False, auto_now_add=False)
    testing_start_time = models.TimeField(auto_now=False, auto_now_add=False)
    testing_end_date = models.DateField(auto_now=False, auto_now_add=False)
    testing_end_time = models.TimeField(auto_now=False, auto_now_add=False)
    applicant_staff_signature = models.TextField()
    applicant_spv_signature = models.TextField()
    recipient_staff_signature = models.TextField()
    recipient_spv_signature = models.TextField()
    class Meta:
        db_table = 'measuring_request_form'
        managed = False