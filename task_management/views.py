from django.shortcuts import render, redirect
from django.http import *
from django.core.exceptions import ObjectDoesNotExist
from task_management.models import *
import json

# Create your views here.
def index(request):
    if request.session.has_key('username'):
        customer = Customer.objects.all()
        vendor = Vendor.objects.all()
        context = {
            'title': 'Task Management',
            'activeClassTask': 'active',
            'customers': customer,
            'vendors': vendor,
        }
        return render(request, 'task_management/index.html', context)
    else:
        return redirect('login-form')


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


def save_task_management(request):
    if request.method == 'POST':
        cekTask = TaskManagement.objects.all().exists()
        id_part = request.POST['id_part']
        id_employee = request.POST['id_employee']
        received_date = request.POST['received_date']
        note = request.POST['note']
        id_request_form = request.POST['id_request_form']
        implode_received_date = received_date.split("/")
        implode_received_date.reverse()
        received_date = "-".join(implode_received_date)
        try:
            if cekTask:
                lastRecord = TaskManagement.objects.latest('id_task')
                id_task = lastRecord.id_task + 1
                id_part = id_part
                id_employee = id_employee
                received_date = received_date
                note = note
                id_request_form = id_request_form
            else:
                id_task = 1
                id_part = id_part
                id_employee = id_employee
                received_date = received_date
                note = note
                id_request_form = id_request_form

            TaskManagement.objects.create(
                id_task = id_task,
                id_part = id_part,
                id_employee = id_employee,
                received_date = received_date,
                note = note,
                id_request = id_request_form
            )
            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404