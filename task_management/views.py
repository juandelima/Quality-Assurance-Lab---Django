from django.shortcuts import render
from django.http import JsonResponse
from task_management.models import *
# Create your views here.
def index(request):
    customer = Customer.objects.all()
    vendor = Vendor.objects.all()
    context = {
        'title': 'Task Management',
        'activeClassTask': 'active',
        'customers': customer,
        'vendors': vendor,
    }
    return render(request, 'task_management/index.html', context)


def datapart(request):
    datapart = DataPart.objects.all()
    data_part = {}
    id_part = []
    nama_part = []
    type_part = []
    id_customer = []
    previous = None
    for data in datapart:
        if previous != data.nama_part:
            id_part.append(data.id_part)
            nama_part.append(data.nama_part)
            type_part.append(data.type)
            id_customer.append(data.id_customer)
            previous = data.nama_part

    data_part['id_part'] = id_part
    data_part['nama_part'] = nama_part
    data_part['type_part'] = type_part
    data_part['id_customer'] = id_customer
    return JsonResponse(data_part, safe = False)


def datamaterial(request):
    datamaterial = Material.objects.all()
    data_material = {}
    material_name = []
    code_vendor = []
    for data in datamaterial:
        material_name.append(data.material_name)
        code_vendor.append(data.code_vendor)
        
    data_material['material_name'] = material_name
    data_material['code_vendor'] = code_vendor
    return JsonResponse(data_material, safe = False) 