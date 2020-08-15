from django.shortcuts import render, redirect
from dashboard.models import *
from measuring_request_form.models import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

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

def info_notif(request):
    response_data = {}
    info_notif = []
    id_request = []
    created = []
    try:
        notif = Notification.objects.all()
        for i in notif:
            if i.is_read == False:
                info_notif.append(i.info_notif)
                created.append(i.created_at)
                id_request.append(i.id_request_form)
        response_data['message'] = "Success"
        response_data["info_notif"] = info_notif
        response_data["created_at"] = created
        response_data["id_request"] = id_request
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404


def detail_info_notif_by_id(request, id_request_form):
    response_data = {}
    try:
        notif = Notification.objects.get(id_request_form__exact=id_request_form)
        get_measuring_form = MeasuringForm.objects.get(id_request__exact=notif.id_request_form)
        cek_data_part = DataPart.objects.filter(id_part=get_measuring_form.id_part).exists()
        if cek_data_part:
            data_part = DataPart.objects.get(id_part__exact=get_measuring_form.id_part)
            customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
            id_part = data_part.id_part
            nama_part = data_part.nama_part
            nama_customer = customer.nama_customer
        else:
            material = Material.objects.get(material_code__exact=get_measuring_form.id_part)
            vendor = Vendor.objects.get(code_vendor__exact=material.code_vendor)
            id_part = material.material_code
            nama_part = data_part.material_name
            nama_customer = vendor.vendor_name
        
        response_data['message'] = "Success"
        response_data['id_part'] = id_part
        response_data['part'] = nama_part
        response_data['customer'] = nama_customer
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404