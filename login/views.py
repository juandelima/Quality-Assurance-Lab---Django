from django.shortcuts import render

# Create your views here.
def index(request):
    context = {
        'title': 'Login',
    }
    return render(request, 'login/index.html', context)