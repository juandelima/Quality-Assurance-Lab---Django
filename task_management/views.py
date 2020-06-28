from django.shortcuts import render
from django.http import JsonResponse
from task_management.models import Customer, DataPart
# Create your views here.

def index(request):
    customer = Customer.objects.all()
    context = {
        'title': 'Task Management',
        'activeClassTask': 'active',
        'customers': customer,
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