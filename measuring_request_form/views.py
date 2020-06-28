from django.shortcuts import render
from django.http import JsonResponse
from measuring_request_form.models import Customer, DataPart
# Create your views here.

def index(request):
    context = {
        'title': 'Measuring Request Form',
        'activeClassMeasuring': 'active'
    }
    return render(request, 'measuring_request_form/index.html', context)


def getdatapart(request):
    getCustomer = Customer.objects.all()
    getDataPart = DataPart.objects.all()
    id_part = []
    no_sap = []
    nama_part = []
    type_part = []
    proses = []
    customer = []
    data_part = {}
    for i in getCustomer:
        duplicate = None
        for j in getDataPart:
            if i.id_customer == j.id_customer:
                if duplicate != j.nama_part:
                    id_part.append(j.id_part)
                    no_sap.append(j.no_sap)
                    nama_part.append(j.nama_part)
                    type_part.append(j.type)
                    proses.append(j.proses)
                    customer.append(i.nama_customer)
                    duplicate = j.nama_part

    data_part['id_part'] = id_part
    data_part['no_sap'] = no_sap
    data_part['nama_part'] = nama_part
    data_part['type_part'] = type_part
    data_part['proses'] = proses
    data_part['customer'] = customer
    return JsonResponse(data_part, safe = False)
