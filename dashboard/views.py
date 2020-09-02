from django.shortcuts import render, redirect
from dashboard.models import *
from measuring_request_form.models import *
from task_management.models import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import *
import json

def index(request):
    if request.session.has_key('username'):
        username = request.session['username']
        context = {
            'title': 'Dashboard',
            'activeClassMain': 'active',
            'username': username
        }
        return render(request, 'dashboard/index.html', context)
    else:
        return redirect('login-form')


def count_notif(request):
    response_data = {}
    try:
        count_notif = Notification.objects.filter(is_read=False).count()
        response_data['message'] = "Success"
        response_data['count_notif'] = count_notif
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def count_task(request):
    response_data = {}
    try:
        count_task = TaskManagement.objects.count()
        response_data['message'] = "Success"
        response_data['count_task'] = count_task
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def info_notif(request):
    response_data = {}
    id_notif = []
    info_notif = []
    id_request = []
    is_read = []
    created = []
    has_fill_task = []
    try:
        notif = Notification.objects.all().order_by('-id_notif')
        for i in notif:
            if cek_task_manage(i.id_request_form):
                has_fill_task.append(True)
            else:
                has_fill_task.append(False)
            id_notif.append(i.id_notif)
            info_notif.append(i.info_notif)
            created.append(i.created_at)
            id_request.append(i.id_request_form)
            is_read.append(i.is_read)
        
        if False in is_read:
            update_is_read(id_notif)

        response_data['message'] = "Success"
        response_data["info_notif"] = info_notif
        response_data["created_at"] = created
        response_data["id_request"] = id_request
        response_data["has_fill_task"] = has_fill_task
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def cek_notif(request):
    response_data = {}
    has_fill_task = []
    try:
        notif = Notification.objects.all().order_by('-id_notif')
        for i in notif:
            if cek_task_manage(i.id_request_form):
                has_fill_task.append(True)
            else:
                has_fill_task.append(False)
        
        response_data["has_fill_task"] = has_fill_task
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def update_is_read(id_notif):
    try:
        for i in id_notif:
            notif = Notification.objects.get(id_notif__exact=i)
            notif.is_read = True
            notif.save()
    except ObjectDoesNotExist:
        raise Http404

def detail_info_notif_by_id(request, id_request_form):
    response_data = {}
    try:
        notif = Notification.objects.get(id_request_form__exact=id_request_form)
        get_measuring_form = MeasuringForm.objects.get(id_request__exact=notif.id_request_form)
        cek_data_part = Material.objects.filter(material_code=get_measuring_form.id_part).exists()
        if not cek_data_part:
            data_part = DataPart.objects.get(id_part__exact=get_measuring_form.id_part)
            customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
            id_part = data_part.id_part
            nama_part = data_part.nama_part
            nama_customer = customer.nama_customer
            id_request_form = notif.id_request_form
        else:
            material = Material.objects.get(material_code__exact=get_measuring_form.id_part)
            vendor = Vendor.objects.get(code_vendor__exact=material.code_vendor)
            id_part = material.material_code
            nama_part = material.material_name
            nama_customer = vendor.vendor_name
            id_request_form = notif.id_request_form

        cekTask = TaskManagement.objects.filter(id_request=notif.id_request_form).exists()
        if cekTask:
            get_task = TaskManagement.objects.get(id_request__exact=notif.id_request_form)
            get_employee = Employee.objects.get(id_employee__exact=get_task.id_employee)
            received_date = get_task.received_date
            pic_operator = get_employee.nama
            note = get_task.note
        else:
            received_date = None
            pic_operator = None
            note = None
        response_data['message'] = "Success"
        response_data['id_part'] = id_part
        response_data['part'] = nama_part
        response_data['customer'] = nama_customer
        response_data['id_request_form'] = id_request_form
        response_data['received_date'] = received_date
        response_data['pic_operator'] = pic_operator
        response_data['note'] = note
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def cek_task_manage(id):
    try:
        cekTask = TaskManagement.objects.filter(id_request=id).exists()
        if cekTask:
            return True
        else:
            return False
    except ObjectDoesNotExist:
        raise Http404