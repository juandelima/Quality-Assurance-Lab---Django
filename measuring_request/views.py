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
            if i.id_recipient_lab_staff != -1:
                count += 1
        response_data['message'] = "Success"
        response_data['count'] = count
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404