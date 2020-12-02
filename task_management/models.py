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

class TaskManagement(models.Model):
    id_task = models.IntegerField(primary_key=True)
    id_part = models.CharField(max_length=20)
    id_employee = models.IntegerField(primary_key=False)
    received_date = models.DateField(auto_now=False, auto_now_add=False)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    id_request = models.CharField(max_length=20)
    class Meta:
        db_table = 'task_management'
        managed = False

class RubbersTolerance(models.Model):
    id = models.IntegerField(primary_key=True)
    inspection_items = models.CharField(max_length=10)
    equip = models.CharField(max_length=20)
    standard = models.CharField(max_length=10)
    class Meta:
        db_table = 'rubbers'
        managed = False


class GeneralInformation(models.Model):
    id_general = models.IntegerField(primary_key=True)
    req_number = models.CharField(max_length=20)
    qty = models.IntegerField(primary_key=False)
    thl = models.CharField(max_length=25)
    measurement_type = models.CharField(max_length=25)
    standard_tolerance = models.IntegerField(primary_key=False)
    id_task = models.CharField(max_length=25)
    class Meta:
        db_table = 'general_information'
        managed = False


class Measurement(models.Model):
    id_measurement = models.IntegerField(primary_key=True)
    sample_1 = models.FloatField()
    sample_2 = models.FloatField()
    sample_3 = models.FloatField()
    sample_4 = models.FloatField()
    sample_5 = models.FloatField()
    id_general = models.IntegerField(primary_key=False)
    class Meta:
        db_table = 'measurement'
        managed = False

class StandardTolerance(models.Model):
    id_tolerance = models.IntegerField(primary_key=True)
    tolerance_name = models.CharField(max_length=50)
    class Meta:
        db_table = 'standard_tolerance'
        managed = False