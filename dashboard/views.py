from django.shortcuts import render, redirect
from dashboard.models import *
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
    created = []
    try:
        notif = Notification.objects.all()
        for i in notif:
            if i.is_read == False:
                info_notif.append(i.info_notif)
                created.append(i.created_at)

        response_data['message'] = "Success"
        response_data["info_notif"] =  info_notif
        response_data["created_at"] = created
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404