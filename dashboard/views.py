from django.shortcuts import render, redirect

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