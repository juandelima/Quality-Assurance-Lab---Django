from django.shortcuts import render
from django.http import JsonResponse
from measuring_request_form.models import *
import csv
# Create your views here.

def index(request):
    getCustomer = Customer.objects.all()
    getDataPart = DataPart.objects.all()
    getVendor = Vendor.objects.all()
    getMaterial = Material.objects.all()
    mappingCustomer = {}
    mappingVendor = {}
    supplier = []
    customer = []

    for i in getVendor:
        mappingVendor[i.code_vendor] = i.vendor_name

    for i in getCustomer:
        mappingCustomer[i.id_customer] = i.nama_customer

    for i in getMaterial:
        temp = [None]*3
        temp[0], temp[1], temp[2] = i.material_code, i.material_name, mappingVendor[i.code_vendor]
        supplier.append(temp)
    
    for i in getDataPart:
        temp = [None]*6
        temp[0], temp[1], temp[2], temp[3], temp[4], temp[5] = i.id_part, i.no_sap, i.nama_part, i.type, i.proses, mappingCustomer[i.id_customer]
        customer.append(temp) 

    context = {
        'title': 'Measuring Request Form',
        'activeClassMeasuring': 'active',
        'customers': customer,
        'data_parts': getDataPart,
        'suppliers': supplier,
    }
    return render(request, 'measuring_request_form/index.html', context)

def getdatapart(request):
    getCustomer = Customer.objects.all()
    getDataPart = DataPart.objects.all()
    customer_mapping = {}
    data_part = {}
    id_part = []
    no_sap = []
    nama_part = []
    type_part = []
    proses = []
    customer = []
    for i in getCustomer:
        customer_mapping[i.id_customer] = i.nama_customer

    for i in getDataPart:
        id_part.append(i.id_part)
        no_sap.append(i.no_sap)
        nama_part.append(i.nama_part)
        type_part.append(i.type)
        proses.append(i.proses)
        customer.append(customer_mapping[i.id_customer])

    data_part['id_part'] = id_part
    data_part['no_sap'] = no_sap
    data_part['nama_part'] = nama_part
    data_part['type_part'] = type_part
    data_part['proses'] = proses
    data_part['customer'] = customer

    return JsonResponse(data_part, safe = False)

def getmaterial(request):
    getVendor = Vendor.objects.all()
    getMaterial = Material.objects.all()
    suppliers = {}
    mappingVendor = {}
    material_code = []
    material_name = []
    vendor = []
    for i in getVendor:
        mappingVendor[i.code_vendor] = i.vendor_name

    for i in getMaterial:
        material_code.append(i.material_code)
        material_name.append(i.material_name)
        vendor.append(mappingVendor[i.code_vendor])

    suppliers['material_code'] = material_code
    suppliers['material_name'] = material_name
    suppliers['vendor'] = vendor

    return JsonResponse(suppliers, safe = False)

def getEmployees(request):
    departemen = Departemen.objects.all()
    employee = Employee.objects.all()
    mappingDepartment = {}
    employees = {}
    id_employee = []
    nama = []
    dept = []
    for i in departemen:
        mappingDepartment[i.dept_code] = i.dept_name

    for i in employee:
        id_employee.append(i.id_employee)
        nama.append(i.nama)
        dept.append(mappingDepartment[i.dept_code])

    employees['id_employee'] = id_employee
    employees['nama'] = nama
    employees['dept'] = dept

    return JsonResponse(employees, safe = False)


def insertEmployees(request):
    departemen = Departemen.objects.all()
    with open('C:\QA-Lab Apps\datakaryawan.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            deptCode = None
            for i in departemen:
                if row[4] == i.dept_name:
                    deptCode = i.dept_code
                    break
            if deptCode != None:
                Employee.objects.create(id_employee = int(row[0]), nama = row[1], nrp = row[2], jabatan = row[3], dept_code = deptCode)
