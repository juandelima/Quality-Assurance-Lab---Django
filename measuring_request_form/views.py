from measuring_request_form.models import *
from dashboard.models import Notification
from django.core.mail import *
from django.shortcuts import render
from django.conf import settings
from django.http import *
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from django.core.exceptions import ObjectDoesNotExist
import json
import csv
import base64
import re
import os
# Create your views here.

def index(request):
    getCustomer = Customer.objects.all()
    getDataPart = DataPart.objects.all()
    getVendor = Vendor.objects.all()
    getMaterial = Material.objects.all()
    mappingCustomer = {}
    mappingVendor = {}
    supplier = []
    customer = []

    for i in getVendor:
        mappingVendor[i.code_vendor] = i.vendor_name

    for i in getCustomer:
        mappingCustomer[i.id_customer] = i.nama_customer

    for i in getMaterial:
        temp = [None]*3
        temp[0], temp[1], temp[2] = i.material_code, i.material_name, mappingVendor[i.code_vendor]
        supplier.append(temp)
    
    for i in getDataPart:
        temp = [None]*6
        temp[0], temp[1], temp[2], temp[3], temp[4], temp[5] = i.id_part, i.no_sap, i.nama_part, i.type, i.proses, mappingCustomer[i.id_customer]
        customer.append(temp) 

    context = {
        'title': 'Measuring Request Form',
        'activeClassMeasuring': 'active',
        'customers': customer,
        'data_parts': getDataPart,
        'suppliers': supplier,
    }
    return render(request, 'measuring_request_form/index.html', context)

def getdatapart(request):
    getCustomer = Customer.objects.all()
    getDataPart = DataPart.objects.all()
    customer_mapping = {}
    data_part = {}
    id_part = []
    no_sap = []
    nama_part = []
    type_part = []
    proses = []
    customer = []
    for i in getCustomer:
        customer_mapping[i.id_customer] = i.nama_customer

    for i in getDataPart:
        id_part.append(i.id_part)
        no_sap.append(i.no_sap)
        nama_part.append(i.nama_part)
        type_part.append(i.type)
        proses.append(i.proses)
        customer.append(customer_mapping[i.id_customer])

    data_part['id_part'] = id_part
    data_part['no_sap'] = no_sap
    data_part['nama_part'] = nama_part
    data_part['type_part'] = type_part
    data_part['proses'] = proses
    data_part['customer'] = customer

    return JsonResponse(data_part, safe = False)

def getmaterial(request):
    getVendor = Vendor.objects.all()
    getMaterial = Material.objects.all()
    suppliers = {}
    mappingVendor = {}
    material_code = []
    material_name = []
    vendor = []
    for i in getVendor:
        mappingVendor[i.code_vendor] = i.vendor_name

    for i in getMaterial:
        material_code.append(i.material_code)
        material_name.append(i.material_name)
        vendor.append(mappingVendor[i.code_vendor])

    suppliers['material_code'] = material_code
    suppliers['material_name'] = material_name
    suppliers['vendor'] = vendor

    return JsonResponse(suppliers, safe = False)

def getEmployees(request):
    departemen = Departemen.objects.all()
    employee = Employee.objects.all()
    mappingDepartment = {}
    employees = {}
    id_employee = []
    nama = []
    email = []
    dept = []
    for i in departemen:
        mappingDepartment[i.dept_code] = i.dept_name

    for i in employee:
        id_employee.append(i.id_employee)
        nama.append(i.nama)
        email.append(i.email)
        dept.append(mappingDepartment[i.dept_code])

    employees['id_employee'] = id_employee
    employees['nama'] = nama
    employees['dept'] = dept
    employees['email'] = email

    return JsonResponse(employees, safe = False)

def saveRequestMeasuringForm(request):
    if request.method == 'POST':
        measuringForm = MeasuringForm.objects.all().exists()
        id_part = request.POST['id_partField']
        address = request.POST['addressField']
        qty_of_cavity = request.POST['qty_of_cavityField']
        qty_of_part = request.POST['qty_of_partField']
        drawing = request.POST['drawingField']
        testing = request.POST['testingField']
        supplier_complementary = request.POST['supplier_complementaryField']
        other_complementary = request.POST['other_complementaryField']
        new_part = request.POST['new_partField']
        regular_part = request.POST['regular_partField']
        periodical = request.POST['periodicalField']
        change_material = request.POST['change_materialField']
        others_part_status = request.POST['others_part_statusField']
        all_dimension = request.POST['all_dimensionField']
        critical_points = request.POST['critical_pointsField']
        dimension = request.POST['dimensionField']
        others_measuring = request.POST['others_measuringField']
        salt_spray = request.POST['salt_sprayField']
        cass_test = request.POST['cass_testField']
        distortion_test = request.POST['distortion_testField']
        painting_test = request.POST['painting_testField']
        impact_test = request.POST['impact_testField']
        tensile_test = request.POST['tensile_testField']
        hardness_test = request.POST['hardness_testField']
        bending_test = request.POST['bending_testField']
        others_testing = request.POST['others_testingField']
        note_measuring = request.POST['note_measuringField']
        signature_staff = request.POST['signature_staffField']
        signature_spv = request.POST['signature_spvField']
        staff_name = request.POST['staff_nameField']
        spv_name = request.POST['spv_nameField']
        signature_staff_lab = request.POST['signature_staff_labField']
        signature_spv_lab = request.POST['signature_spv_labField']
        staff_lab_name = request.POST['staff_lab_nameField']
        spv_lab_name = request.POST['spv_lab_nameField']
        receiving_date = request.POST['receiving_dateField']
        receiving_time = request.POST['receiving_timeField']
        shift = request.POST['shiftField']
        start_testing = request.POST['start_testingField']
        time_start_testing = request.POST['time_start_testingField']
        end_testing = request.POST['end_testingField']
        time_end_testing = request.POST['time_end_testingField']
        email = request.POST['emailField']

        implodeReceiving_date = receiving_date.split("/")
        implodeReceiving_date.reverse()
        newReceiving_date = "-".join(implodeReceiving_date)

        implodeStart_testing = start_testing.split("/")
        implodeStart_testing.reverse()
        newStart_testing = "-".join(implodeStart_testing)

        implodeEnd_testing = end_testing.split("/")
        implodeEnd_testing.reverse()
        newEnd_testing = "-".join(implodeEnd_testing)

        complementary_documents = []
        part_status = []
        measuring_request = []
        testing_request = []
        if staff_name == "":
            staff_name = -1

        if spv_name == "":
            spv_name = -1

        if staff_lab_name == "":
            staff_lab_name = -1

        if spv_lab_name == "":
            spv_lab_name = -1

        if drawing != "" and drawing != "on":
            complementary_documents.append(drawing)
        
        if testing != "" and testing != "on":
            complementary_documents.append(testing)

        if supplier_complementary != "" and supplier_complementary != "on":
            complementary_documents.append(supplier_complementary)

        if other_complementary != "":
            complementary_documents.append(other_complementary)

        if new_part != "" and new_part != "on":
            part_status.append(new_part)

        if regular_part != "" and regular_part != "on":
            part_status.append(regular_part)
        
        if periodical != "" and periodical != "on":
            part_status.append(periodical)

        if change_material != "" and change_material != "on":
            part_status.append(change_material)

        if others_part_status != "":
            part_status.append(others_part_status)

        if all_dimension != "" and all_dimension != "on":
            measuring_request.append(all_dimension)

        if critical_points != "" and critical_points != "on":
            measuring_request.append(critical_points)

        if dimension != "" and dimension != "on":
            measuring_request.append(dimension)

        if others_measuring != "":
            measuring_request.append(others_measuring)

        if salt_spray != "" and salt_spray != "on":
            testing_request.append(salt_spray)

        if cass_test != "" and cass_test != "on":
            testing_request.append(cass_test)

        if distortion_test != "" and distortion_test != "on":
            testing_request.append(distortion_test)

        if painting_test != "" and painting_test != "on":
            testing_request.append(painting_test)

        if impact_test != "" and impact_test != "on":
            testing_request.append(impact_test)

        if tensile_test != "" and tensile_test != "on":
            testing_request.append(tensile_test)

        if hardness_test != "" and hardness_test != "on":
            testing_request.append(hardness_test)

        if bending_test != "" and bending_test != "on":
            testing_request.append(bending_test)

        if others_testing != "":
            testing_request.append(others_testing)

        if measuringForm:
            lastRecord = MeasuringForm.objects.latest('id_request')
            id_request = lastRecord.id_request
            split_id = id_request.split('-')
            getUniqId = split_id[-1]
            getInteger = list(str(int(getUniqId) + 1))
            arrUniqId = list(getUniqId)
            for i in range(len(arrUniqId) - len(getInteger)):
                getInteger.insert(0, '0')
                
            id_request = f'req-{"".join(getInteger)}'
            MeasuringForm.objects.create(
                id_request = id_request,
                id_part = id_part,
                address = address,
                qty_cavity = int(qty_of_cavity),
                qty_part = int(qty_of_part),
                complementary_documents = complementary_documents,
                part_status = part_status,
                measuring_request = measuring_request,
                testing_request = testing_request,
                note = note_measuring,
                id_applicant_staff = staff_name,
                id_applicant_spv = spv_name,
                id_recipient_lab_staff = staff_lab_name,
                id_recipient_lab_spv = spv_lab_name,
                receiving_date = newReceiving_date,
                receiving_time = receiving_time,
                shift = int(shift),
                testing_start_date = newStart_testing,
                testing_start_time = time_start_testing,
                testing_end_date = newEnd_testing,
                testing_end_time = time_end_testing,
                applicant_staff_signature = signature_staff,
                applicant_spv_signature = signature_spv,
                recipient_staff_signature = signature_staff_lab,
                recipient_spv_signature = signature_spv_lab
            )
        else:
            MeasuringForm.objects.create(
                id_request = 'req-00001',
                id_part = id_part,
                address = address,
                qty_cavity = int(qty_of_cavity),
                qty_part = int(qty_of_part),
                complementary_documents = complementary_documents,
                part_status = part_status,
                measuring_request = measuring_request,
                testing_request = testing_request,
                note = note_measuring,
                id_applicant_staff = staff_name,
                id_applicant_spv = spv_name,
                id_recipient_lab_staff = staff_lab_name,
                id_recipient_lab_spv = spv_lab_name,
                receiving_date = newReceiving_date,
                receiving_time = receiving_time,
                shift = int(shift),
                testing_start_date = newStart_testing,
                testing_start_time = time_start_testing,
                testing_end_date = newEnd_testing,
                testing_end_time = time_end_testing,
                applicant_staff_signature = signature_staff,
                applicant_spv_signature = signature_spv,
                recipient_staff_signature = signature_staff_lab,
                recipient_spv_signature = signature_spv_lab
            )

        staffEmail(email)

        return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")

def viewEmail(request):
    getLastRecord = MeasuringForm.objects.all().last()
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    getEmployees = Employee.objects.get(id_employee__exact=getLastRecord.id_applicant_staff)
    getDept = Departemen.objects.get(dept_code__exact=getEmployees.dept_code)
  
    uniqName = None
    for i in getAllDataPart:
        if getLastRecord.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=getLastRecord.id_part)
            nama_part = result.nama_part
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if getLastRecord.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=getLastRecord.id_part)
            nama_part = result.material_name
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break
    context = {
        'nama_part': nama_part,
        'supplier': supplier,
        'qty_cavity': getLastRecord.qty_cavity,
        'qty_part': getLastRecord.qty_part,
        'complementary_documents': ", ".join(getLastRecord.complementary_documents),
        'part_status': ", ".join(getLastRecord.part_status),
        'measuring_request': ", ".join(getLastRecord.measuring_request),
        'testing_request': ", ".join(getLastRecord.testing_request),
        'note': getLastRecord.note,
        'receiving_date': getLastRecord.receiving_date,
        'receiving_time': getLastRecord.receiving_time,
        'shift': getLastRecord.shift,
        'id_request': getLastRecord.id_request
    }
    
    return render(request, 'email/request_form_email_from_staff.html', context)


def addSignature(request, id):
    findByIdMeasuring = MeasuringForm.objects.get(id_request__exact=id)
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    uniqName = None
    if findByIdMeasuring.id_applicant_staff != -1:
        getStaff = Employee.objects.get(id_employee__exact=findByIdMeasuring.id_applicant_staff)
        getStaffDept = Departemen.objects.get(dept_code__exact=getStaff.dept_code)
    else:
        getStaff = None
        getStaffDept = None

    if findByIdMeasuring.id_applicant_spv != -1:
        getSpv = Employee.objects.get(id_employee__exact=findByIdMeasuring.id_applicant_spv)
        getSpvDept = Departemen.objects.get(dept_code__exact=getSpv.dept_code)
    else:
        getSpv = None
        getSpvDept = None

    if findByIdMeasuring.id_recipient_lab_staff != -1:
        getLabStaff = Employee.objects.get(id_employee__exact=findByIdMeasuring.id_recipient_lab_staff)
    else:
        getLabStaff = None
    
    if findByIdMeasuring.id_recipient_lab_spv != -1:
        getLabSpv = Employee.objects.get(id_employee__exact=findByIdMeasuring.id_recipient_lab_spv)
    else:
        getLabSpv = None

    for i in getAllDataPart:
        if findByIdMeasuring.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=findByIdMeasuring.id_part)
            nama_part = result.nama_part
            part_no = result.no_sap
            type_model = result.type
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if findByIdMeasuring.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=findByIdMeasuring.id_part)
            nama_part = result.material_name
            part_no = result.material_code
            type_model = None
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break
    
    is_start_date_null = False
    is_end_date_null = False
    is_start_time_null = False
    is_end_time_null = False
    testing_start_date = str(findByIdMeasuring.testing_start_date)
    testing_start_time = str(findByIdMeasuring.testing_start_time)
    testing_end_date = str(findByIdMeasuring.testing_end_date)
    testing_end_time = str(findByIdMeasuring.testing_end_time)

    if testing_start_date == "2001-01-01":
        is_start_date_null = True

    if testing_start_time == "12:00:00+00:00":
        is_start_time_null = True

    if testing_end_date == "2001-01-01":
        is_end_date_null = True

    if testing_end_time == "12:00:00+00:00":
        is_end_time_null = True

    context = {
        'title': 'Measuring Request Form',
        'measuring_form': findByIdMeasuring,
        'nama_part': nama_part,
        'part_no': part_no,
        'type_model': type_model,
        'supplier': supplier,
        'getStaff': getStaff,
        'getSpv': getSpv,
        'getLabStaff': getLabStaff,
        'getLabSpv': getLabSpv,
        'getStaffDept': getStaffDept,
        'getSpvDept': getSpvDept,
        'is_start_date_null': is_start_date_null,
        'is_end_date_null': is_end_date_null,
        'is_start_time_null': is_start_time_null,
        'is_end_time_null': is_end_time_null
    }
    
    return render(request, 'measuring_request_form/edit.html', context)
    

def updateMeasuringFromSpv(request, id):
    if request.method == 'POST':
        id_request = request.POST['id_requestField']
        signature_spv = request.POST['signature_spvField']
        email = request.POST['emailField']
        spv_name = request.POST['spv_nameField']
        try:
            findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
            findMeasuringById.id_applicant_spv = spv_name
            findMeasuringById.applicant_spv_signature = signature_spv
            findMeasuringById.save()
            spvEmail(email, id_request)
            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404

def updateMeasuringFromStaffLab(request, id):
    if request.method == 'POST':
        id_request = request.POST['id_requestField']
        signature_staff_lab = request.POST['signature_staff_labField']
        email = request.POST['emailField']
        staff_lab_name = request.POST['staff_lab_nameField']
        start_testing = request.POST['start_testingField']
        time_start_testing = request.POST['time_start_testingField']
        end_testing = request.POST['end_testingField']
        time_end_testing = request.POST['time_end_testingField']
        start_testing = start_testing.split("/")
        start_testing.reverse()
        start_testing = "-".join(start_testing)
        end_testing = end_testing.split("/")
        end_testing.reverse()
        end_testing = "-".join(end_testing)
        try:
            findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
            findMeasuringById.id_recipient_lab_staff = staff_lab_name
            findMeasuringById.testing_start_date = start_testing
            findMeasuringById.testing_start_time = time_start_testing
            findMeasuringById.testing_end_date = end_testing
            findMeasuringById.testing_end_time = time_end_testing
            findMeasuringById.recipient_staff_signature = signature_staff_lab
            findMeasuringById.save()
            staffLabEmail(email, id_request)
            return HttpResponse(json.dumps({"message": "Success"}), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404

def updateMeasuringFromSpvLab(request, id):
    if request.method == 'POST':
        id_request = request.POST['id_requestField']
        signature_spv_lab = request.POST['signature_spv_labField']
        email = request.POST['emailField']
        spv_lab_name = request.POST['spv_lab_nameField']
        try:
            getAllDataPart = DataPart.objects.all()
            getAllMaterial = Material.objects.all()
            findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
            findMeasuringById.id_recipient_lab_spv = spv_lab_name
            findMeasuringById.recipient_spv_signature = signature_spv_lab
            get_lab_spv = Employee.objects.get(id_employee__exact=findMeasuringById.id_recipient_lab_spv)
            for i in getAllDataPart:
                if findMeasuringById.id_part == str(i.id_part):
                    result = DataPart.objects.get(id_part__exact=findMeasuringById.id_part)
                    nama_part = result.nama_part
                    break
    
            for i in getAllMaterial:
                if findMeasuringById.id_part == i.material_code:
                    result = Material.objects.get(material_code__exact=findMeasuringById.id_part)
                    nama_part = result.material_name
                    break

            findMeasuringById.save()

            response_data = {}
            response_data['message'] = "Success"
            nama_spv_lab = get_lab_spv.nama
            nama_part = nama_part
            info_notif = f'{nama_spv_lab} Menyetujui Measuring Request Form Untuk Part {nama_part}.'
            createNotification(id_request, info_notif)
            # spvLabEmail(email, id_request)
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        except ObjectDoesNotExist:
            raise Http404


def staffEmail(to):
    getLastRecord = MeasuringForm.objects.all().last()
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    getEmployees = Employee.objects.get(id_employee__exact=getLastRecord.id_applicant_staff)
    getDept = Departemen.objects.get(dept_code__exact=getEmployees.dept_code)
    uniqName = None
    for i in getAllDataPart:
        if getLastRecord.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=getLastRecord.id_part)
            nama_part = result.nama_part
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if getLastRecord.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=getLastRecord.id_part)
            nama_part = result.material_name
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break

    context = {
        'nama_part': nama_part,
        'supplier': supplier,
        'qty_cavity': getLastRecord.qty_cavity,
        'qty_part': getLastRecord.qty_part,
        'complementary_documents': ", ".join(getLastRecord.complementary_documents),
        'part_status': ", ".join(getLastRecord.part_status),
        'measuring_request': ", ".join(getLastRecord.measuring_request),
        'testing_request': ", ".join(getLastRecord.testing_request),
        'note': getLastRecord.note,
        'receiving_date': getLastRecord.receiving_date,
        'receiving_time': getLastRecord.receiving_time,
        'shift': getLastRecord.shift,
        'id_request': getLastRecord.id_request
    }

    htmlTemplate = "email/request_form_email_from_staff.html"
    html_message = render_to_string(htmlTemplate, context)
    email = EmailMessage(
        f'Quality Assurance Lab - Measuring Request Form {nama_part}',
        html_message,
        settings.EMAIL_HOST_USER,
        [to]
    )
    email.content_subtype = "html"
    email.send() 


def spvEmail(to, id_request):
    findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    getEmployees = Employee.objects.get(id_employee__exact=findMeasuringById.id_applicant_staff)
    getDept = Departemen.objects.get(dept_code__exact=getEmployees.dept_code)
    uniqName = None
    for i in getAllDataPart:
        if findMeasuringById.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=findMeasuringById.id_part)
            nama_part = result.nama_part
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if findMeasuringById.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=findMeasuringById.id_part)
            nama_part = result.material_name
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break

    context = {
        'nama_part': nama_part,
        'supplier': supplier,
        'qty_cavity': findMeasuringById.qty_cavity,
        'qty_part': findMeasuringById.qty_part,
        'complementary_documents': ", ".join(findMeasuringById.complementary_documents),
        'part_status': ", ".join(findMeasuringById.part_status),
        'measuring_request': ", ".join(findMeasuringById.measuring_request),
        'testing_request': ", ".join(findMeasuringById.testing_request),
        'note': findMeasuringById.note,
        'receiving_date': findMeasuringById.receiving_date,
        'receiving_time': findMeasuringById.receiving_time,
        'shift': findMeasuringById.shift,
        'id_request': id_request
    }

    htmlTemplate = "email/request_form_email_from_spv.html"
    html_message = render_to_string(htmlTemplate, context)
    email = EmailMessage(
        f'Quality Assurance Lab - Measuring Request Form {nama_part}',
        html_message,
        settings.EMAIL_HOST_USER,
        [to]
    )
    email.content_subtype = "html"
    email.send()

def staffLabEmail(to, id_request):
    findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    getEmployees = Employee.objects.get(id_employee__exact=findMeasuringById.id_applicant_staff)
    getDept = Departemen.objects.get(dept_code__exact=getEmployees.dept_code)
    uniqName = None
    for i in getAllDataPart:
        if findMeasuringById.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=findMeasuringById.id_part)
            nama_part = result.nama_part
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if findMeasuringById.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=findMeasuringById.id_part)
            nama_part = result.material_name
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break

    context = {
        'nama_part': nama_part,
        'supplier': supplier,
        'qty_cavity': findMeasuringById.qty_cavity,
        'qty_part': findMeasuringById.qty_part,
        'complementary_documents': ", ".join(findMeasuringById.complementary_documents),
        'part_status': ", ".join(findMeasuringById.part_status),
        'measuring_request': ", ".join(findMeasuringById.measuring_request),
        'testing_request': ", ".join(findMeasuringById.testing_request),
        'note': findMeasuringById.note,
        'receiving_date': findMeasuringById.receiving_date,
        'receiving_time': findMeasuringById.receiving_time,
        'shift': findMeasuringById.shift,
        'testing_start_date': findMeasuringById.testing_start_date,
        'testing_start_time': findMeasuringById.testing_start_time,
        'testing_end_date': findMeasuringById.testing_end_date,
        'testing_end_time': findMeasuringById.testing_end_time,
        'id_request': id_request,
    }

    htmlTemplate = "email/request_form_email_from_staff_lab.html"
    html_message = render_to_string(htmlTemplate, context)
    email = EmailMessage(
        f'Quality Assurance Lab - Measuring Request Form {nama_part}',
        html_message,
        settings.EMAIL_HOST_USER,
        [to]
    )
    email.content_subtype = "html"
    email.send()


def spvLabEmail(to, id_request):
    findMeasuringById = MeasuringForm.objects.get(id_request__exact=id_request)
    getAllDataPart = DataPart.objects.all()
    getAllMaterial = Material.objects.all()
    getCustomer = Customer.objects.all()
    getVendor = Vendor.objects.all()
    get_applicant_staff = Employee.objects.get(id_employee__exact=findMeasuringById.id_applicant_staff)
    get_applicant_spv = Employee.objects.get(id_employee__exact=findMeasuringById.id_applicant_spv)
    uniqName = None
    for i in getAllDataPart:
        if findMeasuringById.id_part == str(i.id_part):
            result = DataPart.objects.get(id_part__exact=findMeasuringById.id_part)
            nama_part = result.nama_part
            uniqName = 'Part'
            break
    
    for i in getAllMaterial:
        if findMeasuringById.id_part == i.material_code:
            result = Material.objects.get(material_code__exact=findMeasuringById.id_part)
            nama_part = result.material_name
            uniqName = 'Material'
            break

    if uniqName == 'Part':
        for i in getCustomer:
            if result.id_customer == i.id_customer:
                supplier = i.nama_customer
                break
    else:
        for i in getVendor:
            if result.code_vendor == i.code_vendor:
                supplier = i.vendor_name
                break

    context = {
        'nama_part': nama_part,
        'supplier': supplier,
        'qty_cavity': findMeasuringById.qty_cavity,
        'qty_part': findMeasuringById.qty_part,
        'complementary_documents': ", ".join(findMeasuringById.complementary_documents),
        'part_status': ", ".join(findMeasuringById.part_status),
        'measuring_request': ", ".join(findMeasuringById.measuring_request),
        'testing_request': ", ".join(findMeasuringById.testing_request),
        'note': findMeasuringById.note,
        'receiving_date': findMeasuringById.receiving_date,
        'receiving_time': findMeasuringById.receiving_time,
        'shift': findMeasuringById.shift,
        'testing_start_date': findMeasuringById.testing_start_date,
        'testing_start_time': findMeasuringById.testing_start_time,
        'testing_end_date': findMeasuringById.testing_end_date,
        'testing_end_time': findMeasuringById.testing_end_time,
        'id_request': id_request,
    }

    htmlTemplate = "email/request_form_email_from_spv_lab.html"
    html_message = render_to_string(htmlTemplate, context)
    print(get_applicant_staff.email)
    print(get_applicant_spv.email)
    email = EmailMessage(
        f'Quality Assurance Lab - Measuring Request Form {nama_part}',
        html_message,
        settings.EMAIL_HOST_USER,
        [to, get_applicant_staff.email, get_applicant_spv.email]
    )
    email.content_subtype = "html"
    email.send()

def createNotification(id_request_form, info_notif):
    notification = Notification.objects.all().exists()
    if notification:
        lastRecord = Notification.objects.latest('id_notif')
        id_notif = lastRecord.id_notif + 1
        id_request_form = id_request_form
        is_read = False
        info_notif = info_notif
    else:
        id_notif = 1
        id_request_form = id_request_form
        is_read = False
        
        info_notif = info_notif

    try:
        Notification.objects.create(
            id_notif = id_notif,
            id_request_form = id_request_form,
            is_read = is_read,
            info_notif = info_notif
        )
    except ObjectDoesNotExist:
        raise Http404

def insertEmployees(request):
    departemen = Departemen.objects.all()
    with open('C:\QA-Lab Apps\datakaryawan.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            deptCode = None
            for i in departemen:
                if row[4] == i.dept_name:
                    deptCode = i.dept_code
                    break
            if deptCode != None:
                Employee.objects.create(id_employee = int(row[0]), nama = row[1], nrp = row[2], jabatan = row[3], dept_code = deptCode)
