from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from measuring_request_form.models import *
from django.http import *
import json
# Create your views here.
def index(request):
    if request.session.has_key('username'):
        username = request.session['username']
        context = {
            'title': 'Measuring Request',
            'activeClassMeasuring': 'active',
            'username': username
        }
        return render(request, 'measuring_request/index.html', context)
    else:
        return redirect('login-form')

def notif_request_form(request):
    response_data = {}
    try:
        count = 0
        getRequestForm = MeasuringForm.objects.all()
        for i in getRequestForm:
            if i.id_recipient_lab_spv != -1:
                count += 1
        response_data['message'] = "Success"
        response_data['count'] = count
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def data_measuring_request(request):
    response_data = {}
    response_data['data'] = []
    try:
        getRequestForm = MeasuringForm.objects.all().order_by('-id_request')
        for i in getRequestForm:
            cekPart = Material.objects.filter(material_code=i.id_part).exists()
            if not cekPart:
                data_part = DataPart.objects.get(id_part__exact=i.id_part)
                part_name = data_part.nama_part
            else:
                data_part = Material.objects.get(material_code__exact=i.id_part)
                part_name = data_part.material_name

            if i.id_recipient_lab_spv != -1:
                data = {
                    'id_request': i.id_request,
                    'part_name': part_name,
                    'qty_cavity': i.qty_cavity,
                    'qty_part': i.qty_part,
                    'receiving_date': str(i.receiving_date),
                    'receiving_time': str(i.receiving_time),
                    'testing_start': f'{str(i.testing_start_date)} {str(i.testing_start_time)}',
                    'testing_end': f'{str(i.testing_end_date)} {str(i.testing_end_time)}'
                }
                response_data['data'].append(data)
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404