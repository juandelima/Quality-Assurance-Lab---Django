from django.shortcuts import render, redirect
from django.http import *
from login.models import *
from django.contrib.auth import authenticate, login
import json

# Create your views here.
def index(request):
    context = {
        'title': 'Login',
    }
    return render(request, 'login/index.html', context)

def userLogin(request):
    getDataLogin = Users.objects.all()
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        for data in getDataLogin:
            if username == data.username and encrypt(password) == data.password and request.is_ajax():
                request.session['username'] = username
                return HttpResponse(json.dumps({"message": "Success"}),content_type="application/json")
            else:
                if username != data.username and encrypt(password) != data.password:
                    return HttpResponse(json.dumps({"message": "Failed"}), content_type="application/json")
                elif username != data.username:
                    return HttpResponse(json.dumps({"message": "username does not match"}), content_type="application/json")
                else:
                    return HttpResponse(json.dumps({"message": "password does not match"}), content_type="application/json")

def insert_admin(request):
    dataAdmin = [1, 'Admin', 'admin', 'admin@admin.com', 'foreman', 'admin123', True, False]
    Users.objects.create(
        id_user = dataAdmin[0], 
        nama_lengkap = dataAdmin[1], 
        username = dataAdmin[2], 
        email = dataAdmin[3],
        role = dataAdmin[4],
        password = encrypt(dataAdmin[5]),
        is_active = dataAdmin[6],
        is_login = dataAdmin[7]
    )
    data = {
        'success': 200,
    }
    return JsonResponse(data, safe = False)


def userLogout(request):
    try:
        del request.session['username']
    except KeyError:
        pass
    return redirect('login-form')


def encrypt(password):
    result = ""
    for i in password:
        char = i
        if char.isupper():
            result += chr((ord(char) + 4 - 65) % 26 + 65)
        else:
            result += chr((ord(char) + 4 - 97) % 26 + 97)
    return result
