from django.shortcuts import render

# Create your views here.

def index(request):
    context = {
        'title': 'Measuring Request Form',
        'activeClassMeasuring': 'active'
    }
    return render(request, 'measuring_request_form/index.html', context)