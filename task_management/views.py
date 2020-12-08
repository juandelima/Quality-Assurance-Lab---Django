from django.shortcuts import render, redirect
from django.http import *
from django.core.exceptions import ObjectDoesNotExist
from task_management.models import *
from measuring_request_form.models import *
from datetime import datetime
import json

# Create your views here.
def index(request):
    if request.session.has_key('username'):
        customer = Customer.objects.all()
        vendor = Vendor.objects.all()
        context = {
            'title': 'Task Management',
            'activeClassTask': 'active',
            'customers': customer,
            'vendors': vendor,
        }
        return render(request, 'task_management/index.html', context)
    else:
        return redirect('login-form')


def datapart(request):
    datapart = DataPart.objects.all()
    data_part = {}
    id_part = []
    nama_part = []
    type_part = []
    id_customer = []
    previous = None
    for data in datapart:
        if previous != data.nama_part:
            id_part.append(data.id_part)
            nama_part.append(data.nama_part)
            type_part.append(data.type)
            id_customer.append(data.id_customer)
            previous = data.nama_part

    data_part['id_part'] = id_part
    data_part['nama_part'] = nama_part
    data_part['type_part'] = type_part
    data_part['id_customer'] = id_customer
    return JsonResponse(data_part, safe = False)

def datamaterial(request):
    datamaterial = Material.objects.all()
    data_material = {}
    material_name = []
    code_vendor = []
    for data in datamaterial:
        material_name.append(data.material_name)
        code_vendor.append(data.code_vendor)
        
    data_material['material_name'] = material_name
    data_material['code_vendor'] = code_vendor
    return JsonResponse(data_material, safe = False)


def save_task_management(request):
    if request.method == 'POST':
        cekTask = TaskManagement.objects.all().exists()
        id_part = request.POST['id_part']
        id_employee = request.POST['id_employee']
        received_date = request.POST['received_date']
        note = request.POST['note']
        id_request_form = request.POST['id_request_form']
        implode_received_date = received_date.split("/")
        implode_received_date.reverse()
        received_date = "-".join(implode_received_date)
        try:
            if cekTask:
                lastRecord = TaskManagement.objects.latest('id_task')
                id_task = lastRecord.id_task + 1
                id_part = id_part
                id_employee = id_employee
                received_date = received_date
                note = note
                id_request_form = id_request_form
            else:
                id_task = 1
                id_part = id_part
                id_employee = id_employee
                received_date = received_date
                note = note
                id_request_form = id_request_form

            TaskManagement.objects.create(
                id_task = id_task,
                id_part = id_part,
                id_employee = id_employee,
                received_date = received_date,
                note = note,
                id_request = id_request_form
            )
            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404

def get_task_management(request):
    response_data = {}
    response_data["data"] = []
    try:
        get_task_management = TaskManagement.objects.all().order_by('-id_task')
        for i in get_task_management:
            cekPart = Material.objects.filter(material_code=i.id_part).exists()
            cekGeneral = GeneralInformation.objects.filter(id_task=i.id_task).exists()
            employee = Employee.objects.get(id_employee__exact=i.id_employee)
            if not cekPart:
                data_part = DataPart.objects.get(id_part__exact=i.id_part)
                customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
                nama_part = data_part.nama_part
                customer_name = customer.nama_customer
            else:
                data_part = Material.objects.get(material_code__exact=i.id_part)
                vendor = Vendor.objects.get(code_vendor__exact=data_part.code_vendor)
                nama_part = data_part.material_name
                customer_name = vendor.vendor_name

            if cekGeneral:
                getGeneralById = GeneralInformation.objects.get(id_task__exact=i.id_task)
                if getGeneralById.signature_inspected != "" and getGeneralById.signature_checked != "" and getGeneralById.signature_approved != "":
                     inspected = '√'
                     checked =  '√'
                     approved = '√'
                elif getGeneralById.signature_inspected != "" and getGeneralById.signature_checked != "":
                    inspected = '√'
                    checked =  '√'
                    approved = f'<a href="#" class="btn btn-info btn-sm click_inspected" data-toggle="modal" id="#modalScroll_{i.id_task}"> Action</a>'
                elif getGeneralById.signature_inspected != "":
                    inspected = '√'
                    checked = f'<a href="#" class="btn btn-info btn-sm click_inspected" data-toggle="modal" id="#modalScroll_{i.id_task}"> Action</a>'
                    approved = '-'
                else:
                    inspected = f'<a href="#" class="btn btn-info btn-sm click_inspected" data-toggle="modal" id="#modalScroll_{i.id_task}"> Action</a>'
                    checked =  '-'
                    approved = '-'

                data = {
                    'id_task': i.id_task,
                    'alert': '<i class="fa fa-circle text-success"></i>',
                    'id_part': i.id_task,
                    'part_name': nama_part,
                    'request_form': customer_name,
                    'pic': employee.nama,
                    'task': '√',
                    'inspected': inspected,
                    'checked':checked,
                    'approved': approved,
                    'created_at': convert_date(i.created_at)
                }
            else:
                data = {
                    'id_task': i.id_task,
                    'alert': '<i class="fa fa-circle text-success"></i>',
                    'id_part': i.id_task,
                    'part_name': nama_part,
                    'request_form': customer_name,
                    'pic': employee.nama,
                    'task': f'<a href="#" class="btn btn-info btn-sm click_task" data-toggle="modal" data-target="#general_information_{i.id_task}" id="#modalScroll_{i.id_task}"> Action</a>',
                    'inspected': '-',
                    'checked': '-',
                    'approved': '-',
                    'created_at': convert_date(i.created_at)
                }
            response_data["data"].append(data)
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404


def get_detail_task(request, id_task):
    try:
        get_task_by_id = TaskManagement.objects.get(id_task__exact=id_task)
        id_request_form = get_task_by_id.id_request
        get_request_form_by_id = MeasuringForm.objects.get(id_request__exact=id_request_form)
        get_id_part = get_request_form_by_id.id_part
        cek_data_part = Material.objects.filter(material_code=get_id_part).exists()
        if not cek_data_part:
            data_part = DataPart.objects.get(id_part__exact=get_id_part)
            customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
            id_part = data_part.id_part
            nama_part = data_part.nama_part
            nama_customer = customer.nama_customer
            no_part = data_part.no_sap
        else:
            material = Material.objects.get(material_code__exact=get_id_part)
            vendor = Vendor.objects.get(code_vendor__exact=material.code_vendor)
            id_part = material.material_code
            nama_part = material.material_name
            nama_customer = vendor.vendor_name
            no_part = material.material_code
        
        data = {
            'customer_or_supplier': nama_customer,
            'received': get_task_by_id.received_date,
            'part_name': nama_part,
            'part_number': no_part
        }
        return JsonResponse(data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def convert_date(created_at):
    split_date = str(created_at).split('-')
    split_date[2] = split_date[2].split(' ')[0]
    x = datetime(int(split_date[0]), int(split_date[1]), int(split_date[2]))
    return x.strftime("%d-%B-%Y")

def rubbers_tolerance(request):
    response_data = {}
    response_data["data"] = []
    try:
        get_rubbers_tolerance = RubbersTolerance.objects.all()
        for i in get_rubbers_tolerance:
            standard = i.standard.split('-')
            data = {
                'id_rubber': i.id,
                'inspection_items': i.inspection_items,
                'equip': i.equip,
                'standard1': float(standard[0]),
                'standard2': float(standard[1])
            }
            response_data["data"].append(data)
        return JsonResponse(response_data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def rubbers_tolerance_by_id(request, id_rubber):
    try:
        get_rubber_tolerance = RubbersTolerance.objects.get(id__exact=id_rubber)
        standard = get_rubber_tolerance.standard.split('-')
        data = {
            'id_rubber': get_rubber_tolerance.id,
            'standard1': float(standard[0]),
            'standard2': float(standard[1])
        }
        return JsonResponse(data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def save_measurement_rubbers(request):
    if request.method == 'POST':
        cekGeneral = GeneralInformation.objects.all().exists()
        req_number = request.POST['req_number']
        qty = request.POST['qty']
        thl = request.POST['thl']
        measurement_type = request.POST['measurement_type']
        standard_tolerance = request.POST['standard_tolerance']
        id_task = request.POST['id_tasks']
        samples = []
        sample1 = []
        sample2 = []
        sample3 = []
        sample4 = []
        sample5 = []
        sample6 = []

        sample1_1 = request.POST['sample1_1']
        sample2_1 = request.POST['sample2_1']
        sample3_1 = request.POST['sample3_1']
        sample4_1 = request.POST['sample4_1']
        sample5_1 = request.POST['sample5_1']
        sample1.append(sample1_1)
        sample1.append(sample2_1)
        sample1.append(sample3_1)
        sample1.append(sample4_1)
        sample1.append(sample5_1)

        sample1_2 = request.POST['sample1_2']
        sample2_2 = request.POST['sample2_2']
        sample3_2 = request.POST['sample3_2']
        sample4_2 = request.POST['sample4_2']
        sample5_2 = request.POST['sample5_2']
        sample2.append(sample1_2)
        sample2.append(sample2_2)
        sample2.append(sample3_2)
        sample2.append(sample4_2)
        sample2.append(sample5_2)

        sample1_3 = request.POST['sample1_3']
        sample2_3 = request.POST['sample2_3']
        sample3_3 = request.POST['sample3_3']
        sample4_3 = request.POST['sample4_3']
        sample5_3 = request.POST['sample5_3']
        sample3.append(sample1_3)
        sample3.append(sample2_3)
        sample3.append(sample3_3)
        sample3.append(sample4_3)
        sample3.append(sample5_3)

        sample1_4 = request.POST['sample1_4']
        sample2_4 = request.POST['sample2_4']
        sample3_4 = request.POST['sample3_4']
        sample4_4 = request.POST['sample4_4']
        sample5_4 = request.POST['sample5_4']
        sample4.append(sample1_4)
        sample4.append(sample2_4)
        sample4.append(sample3_4)
        sample4.append(sample4_4)
        sample4.append(sample5_4)

        sample1_5 = request.POST['sample1_5']
        sample2_5 = request.POST['sample2_5']
        sample3_5 = request.POST['sample3_5']
        sample4_5 = request.POST['sample4_5']
        sample5_5 = request.POST['sample5_5']
        sample5.append(sample1_5)
        sample5.append(sample2_5)
        sample5.append(sample3_5)
        sample5.append(sample4_5)
        sample5.append(sample5_5)

        sample1_6 = request.POST['sample1_6']
        sample2_6 = request.POST['sample2_6']
        sample3_6 = request.POST['sample3_6']
        sample4_6 = request.POST['sample4_6']
        sample5_6 = request.POST['sample5_6']
        sample6.append(sample1_6)
        sample6.append(sample2_6)
        sample6.append(sample3_6)
        sample6.append(sample4_6)
        sample6.append(sample5_6)

        samples.append(sample1)
        samples.append(sample2)
        samples.append(sample3)
        samples.append(sample4)
        samples.append(sample5)
        samples.append(sample6)
        try:
            if cekGeneral:
                lastRecord = GeneralInformation.objects.latest('id_general')
                id_general = lastRecord.id_general + 1
            else:
                id_general = 1

            GeneralInformation.objects.create(
                id_general = id_general,
                req_number = req_number,
                qty = qty,
                thl = thl,
                measurement_type = measurement_type,
                standard_tolerance = standard_tolerance,
                id_task = id_task
            )

            lastRecord = GeneralInformation.objects.latest('id_general')
            last_id_general = lastRecord.id_general
            for i in samples:
                cekMeasurement = Measurement.objects.all().exists()
                if cekMeasurement:
                    lastRecord = Measurement.objects.latest('id_measurement')
                    id_measurement = lastRecord.id_measurement + 1
                else:
                    id_measurement = 1
                Measurement.objects.create(
                    id_measurement = id_measurement,
                    sample_1 = i[0],
                    sample_2 = i[1],
                    sample_3 = i[2],
                    sample_4 = i[3],
                    sample_5 = i[4],
                    id_general = last_id_general
                )
            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404

def get_measurement_rubbers(request, id_task):
    try:
        measurements = []
        get_general = GeneralInformation.objects.get(id_task__exact=id_task)
        standard_tolerance = StandardTolerance.objects.get(id_tolerance__exact=get_general.standard_tolerance)
        get_task = TaskManagement.objects.get(id_task__exact=get_general.id_task)
        cek_data_part = Material.objects.filter(material_code=get_task.id_part).exists()
        get_measurement = Measurement.objects.all()
        get_rubbers = RubbersTolerance.objects.all()
        index = 0
        for i in get_measurement:
            if get_general.id_general == i.id_general:
                standard = get_rubbers[index].standard.split('-')
                result_1 = False
                result_2 = False
                result_3 = False
                result_4 = False
                result_5 = False

                if i.sample_1 < -float(standard[-1]) or i.sample_1 > float(standard[-1]):
                    result_1 = True
                
                if i.sample_2 < -float(standard[-1]) or i.sample_2 > float(standard[-1]):
                    result_2 = True

                if i.sample_3 < -float(standard[-1]) or i.sample_3 > float(standard[-1]):
                    result_3 = True

                if i.sample_4 < -float(standard[-1]) or i.sample_4 > float(standard[-1]):
                    result_4 = True
                
                if i.sample_5 < -float(standard[-1]) or i.sample_5 > float(standard[-1]):
                    result_5 = True

                if result_1 and result_2 and result_3 and result_4 and result_5:
                    result = 'X'
                else:
                    result = 'O'

                
                calculate_x = (i.sample_1 + i.sample_2 + i.sample_3 + i.sample_4 + i.sample_5) / 5
                find_max = max(i.sample_1, i.sample_2, i.sample_3, i.sample_4, i.sample_5)
                find_min = min(i.sample_1, i.sample_2, i.sample_3, i.sample_4, i.sample_5)
                r_result = find_max - find_min
                data = {
                    'id_rubber': get_rubbers[index].id,
                    'inspection_items': get_rubbers[index].inspection_items,
                    'equip': get_rubbers[index].equip,
                    'standard1': float(standard[0]),
                    'standard2': float(standard[-1]),
                    'sample_1': i.sample_1,
                    'sample_2': i.sample_2,
                    'sample_3': i.sample_3,
                    'sample_4': i.sample_4,
                    'sample_5': i.sample_5,
                    'x_result': calculate_x,
                    'r_result': r_result,
                    'result': result
                }
                measurements.append(data)
                index += 1

        if not cek_data_part:
            data_part = DataPart.objects.get(id_part__exact=get_task.id_part)
            customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
            id_part = data_part.id_part
            nama_part = data_part.nama_part
            nama_customer = customer.nama_customer
            no_part = data_part.no_sap
        else:
            material = Material.objects.get(material_code__exact=get_task.id_part)
            vendor = Vendor.objects.get(code_vendor__exact=material.code_vendor)
            id_part = material.material_code
            nama_part = material.material_name
            nama_customer = vendor.vendor_name
            no_part = material.material_code
        
        data = {
            'id_general': get_general.id_general,
            'req_number': get_general.req_number,
            'qty': get_general.qty,
            'thl': get_general.thl,
            'measurement_type': get_general.measurement_type,
            'standard_tolerance': standard_tolerance.tolerance_name,
            'customer': nama_customer,
            'received': get_task.received_date,
            'part_name': nama_part,
            'no_part': no_part,
            'measurements': measurements
        }
        return JsonResponse(data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def pdf_view_rubbers_tolerance(request, id_general):
    try:
        get_general = GeneralInformation.objects.get(id_general__exact=id_general)
        standard_tolerance = StandardTolerance.objects.get(id_tolerance__exact=get_general.standard_tolerance)
        get_task = TaskManagement.objects.get(id_task__exact=get_general.id_task)
        get_measuring_form = MeasuringForm.objects.get(id_request__exact=get_task.id_request)
        cek_data_part = Material.objects.filter(material_code=get_measuring_form.id_part).exists()
        get_measurement = Measurement.objects.all()
        
        if get_general.standard_tolerance == 1:
            pass
        elif get_general.standard_tolerance == 2:
            pass
        elif get_general.standard_tolerance == 3:
            standard_tolerance_type = RubbersTolerance.objects.all()
        elif get_general.standard_tolerance == 4:
            pass
        else:
            pass

        if not cek_data_part:
            data_part = DataPart.objects.get(id_part__exact=get_task.id_part)
            customer = Customer.objects.get(id_customer__exact=data_part.id_customer)
            id_part = data_part.id_part
            nama_part = data_part.nama_part
            nama_customer = customer.nama_customer
            no_part = data_part.no_sap
        else:
            material = Material.objects.get(material_code__exact=get_task.id_part)
            vendor = Vendor.objects.get(code_vendor__exact=material.code_vendor)
            id_part = material.material_code
            nama_part = material.material_name
            nama_customer = vendor.vendor_name
            no_part = material.material_code

        data_measurement = []
        for i in get_measurement:
            temp = []
            if i.id_general == id_general:
                temp.append(i.sample_1)
                temp.append(i.sample_2)
                temp.append(i.sample_3)
                temp.append(i.sample_4)
                temp.append(i.sample_5)
                data_measurement.append(temp)
        
        measurements = []
        x_result = 0
        r_result = 0
        for i in range(len(standard_tolerance_type)):
            sample_1 = data_measurement[i][0]
            sample_2 = data_measurement[i][1]
            sample_3 = data_measurement[i][2]
            sample_4 = data_measurement[i][3]
            sample_5 = data_measurement[i][4]
            standard = standard_tolerance_type[i].standard.split('-')
            x_result = 0.0
            r_result = 0.0
            if sample_1 != 0 or sample_2 != 0 or sample_3 != 0 or sample_4 != 0 or sample_5 != 0:
                calculate_x = (sample_1 + sample_2 + sample_3 + sample_4 + sample_5) / 5
                find_max = max(sample_1, sample_2, sample_3, sample_4, sample_5)
                find_min = min(sample_1, sample_2, sample_3, sample_4, sample_5)
                result_1 =  False
                result_2 =  False
                result_3 =  False
                result_4 =  False
                result_5 =  False
                x_result = calculate_x
                r_result = find_max - find_min
                if sample_1 < -float(standard[-1]) or sample_1 > float(standard[-1]):
                    result_1 = True
                
                if sample_2 < -float(standard[-1]) or sample_2 > float(standard[-1]):
                    result_2 = True

                if sample_3 < -float(standard[-1]) or sample_3 > float(standard[-1]):
                    result_3 = True

                if sample_4 < -float(standard[-1]) or sample_4 > float(standard[-1]):
                    result_4 = True
                
                if sample_5 < -float(standard[-1]) or sample_5 > float(standard[-1]):
                    result_5 = True

                if result_1 and result_2 and result_3 and result_4 and result_5:
                    result = 'X'
                else:
                    result = 'O'

            data = {
                'id_rubber': standard_tolerance_type[i].id,
                'inspection_items': standard_tolerance_type[i].inspection_items,
                'equip': standard_tolerance_type[i].equip,
                'standard1': float(standard[0]),
                'standard2': float(standard[-1]),
                'sample_1': sample_1,
                'sample_2': sample_2,
                'sample_3': sample_3,
                'sample_4': sample_4,
                'sample_5': sample_5,
                'x_result': round(x_result, 2),
                'r_result': round(r_result, 2),
                'result': result
            }

            measurements.append(data)

        data = {
            'get_general': get_general,
            'get_task': get_task,
            'get_measuring_form': get_measuring_form,
            'get_measurement': get_measurement,
            'standard_tolerance_type': standard_tolerance_type,
            'data_measurement': data_measurement,
            'nama_part': nama_part,
            'nama_customer': nama_customer,
            'no_part': no_part,
            'standard_tolerance': standard_tolerance.tolerance_name,
            'measurements': measurements,
            'title': 'Measuring Report'
        }
        return render(request, 'task_management/pdf_view.html', data)
    except ObjectDoesNotExist:
        raise Http404


def getGeneralById(request, id_general):
    try:
        get_general = GeneralInformation.objects.get(id_general__exact=id_general)
        data = {
            'signature_inspected': get_general.signature_inspected,
            'signature_checked': get_general.signature_checked,
            'signature_approved': get_general.signature_approved
        }
        return JsonResponse(data, safe = False)
    except ObjectDoesNotExist:
        raise Http404

def updateGeneralById(request, id_general):
    try:
        signature = request.POST['signature']
        if request.method == 'POST':
            get_general = GeneralInformation.objects.get(id_general__exact=id_general)
            signature_inspected = get_general.signature_inspected
            signature_checked = get_general.signature_checked
            signature_approved = get_general.signature_approved
            if signature_inspected == "":
                get_general.signature_inspected = signature
            elif signature_checked == "":
                get_general.signature_checked = signature
            elif signature_approved == "":
                get_general.signature_approved = signature
            get_general.save()

            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
    except ObjectDoesNotExist:
        raise Http404