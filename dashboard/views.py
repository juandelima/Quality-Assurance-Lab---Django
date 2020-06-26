from django.shortcuts import render

def index(request):
    context = {
        'title': 'Dashboard',
        'activeClassMain': 'active',
    }
    return render(request, 'dashboard/index.html', context)