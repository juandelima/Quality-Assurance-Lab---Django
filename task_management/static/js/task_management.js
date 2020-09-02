class TaskManagement {
    main() {
       $(document).ready(() => {
           const save_task_management = document.getElementById("save_task_management");
           this.render_data();
           this.get_data_task_management();
           this.hide_load_button(); 
           save_task_management.onclick = () => {
               document.getElementsByName("csrfmiddlewaretoken")[0].setAttribute("id", "csrf_new_task");
               const csrfmiddlewaretoken = document.getElementById("csrf_new_task");
               const received_date = document.getElementById("received_date");
               const id_part = document.getElementById("id_part");
               const pic_operator = document.getElementById("pic_operator");
               const inputNote = document.getElementById("inputNote");
               const id_request_form = document.getElementById("id_request_form");
               const data = {
                   csrfField: csrfmiddlewaretoken.value,
                   received_dateField: received_date.value,
                   id_partField: id_part.value,
                   pic_operatorField: pic_operator.value,
                   inputNoteField: inputNote.value,
                   id_request_formField: id_request_form.value,
               };
               if(data.received_dateField === "" || data.pic_operatorField === "") {
                   alert("Received Date dan Pic Operator tidak boleh kosong!");
               } else {
                   this.save(data);
               }
           };
       });    
    }


    get_data_task_management() {
        fetch(`/task-management/get-task-management/`)
        .then(result => {
            return result.json();
        })
        .then(data => {
            this.render_html_modal_general_information(data['data']);
        })
        .catch(error => {
            console.log(error);
        });
    }

    save(data) {
       $.ajax({
           type: "POST",
           url: `/task-management/save-task-management/`,
           data: {
               csrfmiddlewaretoken: data.csrfField,
               id_part: data.id_partField,
               id_employee: data.pic_operatorField,
               received_date: data.received_dateField,
               note: data.inputNoteField,
               id_request_form: data.id_request_formField
           },
           beforeSend: () => {
               this.hide_btn_task();
               this.show_load_button();
           },
           success: (response) => {
                if(response['message'] == 'Success') {
                    setTimeout(() => {
                        $("#create_new_task").modal("hide");
                        this.show_toast();
                        this.show_btn_task();
                        this.hide_load_button();
                        this.render_data();
                        this.get_data_task_management();
                    }, 1000);
                }
           },

           error: (xhr, status, error) => {
               alert(xhr.responseText);
           },
       });
    }

    render_data() {
        $('#dataTableTask').DataTable({
            ajax: {
                "url": "/task-management/get-task-management/",
                "type": "GET"
            },
            destroy: true,
            processing: true,
            deferRender: true,
            columns: [
               {
                   data: 'alert',
               },
               {
                   data: 'part_name'
               },
               {
                   data: 'request_form'
               },
               {
                   data: 'pic'
               },
               {
                   data: 'task',
               },
               {
                   data: 'inspected'
               },
               {
                   data: 'checked'
               },
               {
                   data: 'approved'
               },
               {
                   data: 'created_at'
               } 
            ]
        });
    }

    show_toast() {
        let x = document.getElementById("toast");
        x.className = "show";
        setTimeout(() => { 
            x.className = x.className.replace("show", ""); 
        }, 5000);
    }

    render_html_modal_general_information(data) {
        let modal_general_information = document.getElementById("modal-general-information");
        modal_general_information.innerHTML = '';

        data.forEach((value, index) => {
            modal_general_information.innerHTML += `
            <div class="modal fade bd-example-modal-xl" id="general_information_${value.id_task}" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel_${value.id_task}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myExtraLargeModalLabel_${value.id_task}">General Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
    
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputReg__${value.id_task}" class="col-sm-4 col-form-label">Registration Number</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputReg__${value.id_task}" name="registration_number"
                                                class="form-control form-control-sm" placeholder="003/QA-0994/3/13">
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputSupplier_${value.id_task}" class="col-sm-4 col-form-label">Supplier Name</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputSupplier_${value.id_task}" name="supplier_name"
                                                class="form-control form-control-sm" placeholder="Supp #1">
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputQuantity_${value.id_task}" class="col-sm-4 col-form-label">Quantity</label>
                                        <div class="col-sm-8">
                                            <input type="number" id="inputQuantity_${value.id_task}" name="quantity"
                                                class="form-control form-control-sm" placeholder="0">
                                        </div>
                                    </div>
                                </div>
    
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputReceived_${value.id_task}" class="col-sm-4 col-form-label">Received</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputReceived_${value.id_task}" name="received"
                                                class="form-control form-control-sm" placeholder="20 Juni 2020" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
    
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputTemp_${value.id_task}" class="col-sm-4 col-form-label">Temp/Hum/Lightness</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputTemp_${value.id_task}" name="temp_hum_lightness"
                                                class="form-control form-control-sm" placeholder="50C/55%/1128 lux">
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputPartName_${value.id_task}" class="col-sm-4 col-form-label">Part Name</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputPartName_${value.id_task}" name="part_name"
                                                class="form-control form-control-sm" placeholder="Mirror Assy Outer RH">
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row">
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputMeasureMent_${value.id_task}" class="col-sm-4 col-form-label">Measurement
                                            Type</label>
                                        <div class="col-sm-8">
                                            <select class="select2-single-placeholder5 form-control" name="measurement_name"
                                                id="inputMeasureMent_${value.id_task}">
                                                <option value="">Select</option>
                                                <option value="Change Machine">Change Machine</option>
                                                <option value="Change Material">Change Material</option>
                                                <option value="New Part">New Part</option>
                                                <option value="Periodical">Periodical</option>
                                                <option value="Repair Tools">Repair Tools</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputPartNumber_${value.id_task}" class="col-sm-4 col-form-label">Part Number</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputPartNumber_${value.id_task}" name="part_number"
                                                class="form-control form-control-sm" placeholder="QB2MRR-GANTZRBK01">
                                        </div>
                                    </div>
                                </div>
    
                            </div>
    
    
                            <div class="row">
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputStandart_${value.id_task}" class="col-sm-4 col-form-label">Standart
                                            Tolerance</label>
                                        <div class="col-sm-8">
                                            <select class="select2-single-placeholder6 form-control"
                                                name="standart_tolerance" id="inputStandart_${value.id_task}">
                                                <option value="">Select</option>
                                                <option value="Tolerance Dimension TSZ 2205 G / DTSZ 2205 G">Tolerance
                                                    Dimension TSZ 2205 G / DTSZ 2205 G</option>
                                                <option value="Plastic Molding (HES D0007 -08)">Plastic Molding (HES D0007
                                                    -08)</option>
                                                <option value="Rubbers (HES D0020-73)">Rubbers (HES D0020-73)</option>
                                                <option value="Periodical">Periodical</option>
                                                <option value="Tolerance By HES D00008 - 08 (Pressing)">Tolerance By HES
                                                    D00008 - 08 (Pressing)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputPartType_${value.id_task}" class="col-sm-4 col-form-label">Part Type/Model</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputPartType_${value.id_task}" name="part_type"
                                                class="form-control form-control-sm" placeholder="KZRA">
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <hr>
                            <h5 class="modal-title" id="myExtraLargeModalLabel">Measurement Results</h5>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group row">
                                        <label for="inputIlustration_${value.id_task}" class="col-sm-2 col-form-label">Image
                                            Ilustration</label>
                                        <div class="col-sm-4">
                                            <input type="file" id="inputIlustration_${value.id_task}" name="image_ilustration"
                                                class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th width="150">Inspection Item</th>
                                                <th>Method/Equip</th>
                                                <th>Sample 1</th>
                                                <th>Sample 2</th>
                                                <th>Sample 3</th>
                                                <th>Sample 4</th>
                                                <th>Sample 5</th>
                                                <th>Standart</th>
                                                <th></th>
                                            </tr>
                                        </thead>
    
                                        <tbody id="row_measurements_${value.id_task}">
                                            <tr id="row_${value.id_task}">
                                                <td>
                                                    <input type="text" id="inpection_${value.id_task}" name="inpection_name"
                                                        class="form-control form-control-sm" placeholder="Distance">
                                                </td>
    
                                                <td>
                                                    <input type="text" id="method_${value.id_task}" name="method_name"
                                                        class="form-control form-control-sm" placeholder="CMM">
                                                </td>
    
                                                <td>
                                                    <input type="text" id="sample1_${value.id_task}" name="sample_${value.id_task}_name"
                                                        class="form-control form-control-sm" placeholder="0" readonly>
                                                </td>
    
                                                <td>
                                                    <input type="text" id="sample2_${value.id_task}" name="sample_${value.id_task}_name"
                                                        class="form-control form-control-sm" placeholder="0" readonly>
                                                </td>
    
                                                <td>
                                                    <input type="text" id="sample3_${value.id_task}" name="sample_${value.id_task}_name"
                                                        class="form-control form-control-sm" placeholder="0" readonly>
                                                </td>
    
                                                <td>
                                                    <input type="text" id="sample4_${value.id_task}" name="sample_${value.id_task}_name"
                                                        class="form-control form-control-sm" placeholder="0" readonly>
                                                </td>
    
                                                <td>
                                                    <input type="text" id="sample5_${value.id_task}" name="sample_${value.id_task}_name"
                                                        class="form-control form-control-sm" placeholder="0" readonly>
                                                </td>
    
                                                <td>
                                                    <div class="row">
                                                        <div class="col-sm-5">
                                                            <input type="text" id="standart1_${value.id_task}" name="standart_${value.id_task}_name"
                                                                class="form-control form-control-sm" placeholder="0">
                                                        </div>
                                                        <span>±</span>
                                                        <div class="col-sm-5">
                                                            <input type="text" id="standart2_${value.id_task}" name="standart_${value.id_task}_name"
                                                                class="form-control form-control-sm" placeholder="0">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <a href="#" class="btn btn-danger btn-sm btn-icon-split" id="tambah_row__${value.id_task}">
                                <span class="icon text-white-50">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span class="text">Tambah</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            `;
        });
    }

    hide_load_button() {
        return document.getElementById("button__load").style.display = "none";
    }

    show_load_button() {
        return document.getElementById("button__load").style.display = "block";
    }

    hide_btn_task() {
        return document.getElementById("main_btn_save_task_management").style.display = "none";
    }

    show_btn_task() {
        return document.getElementById("main_btn_save_task_management").style.display = "block";
    }
}

const task_management = new TaskManagement();
task_management.main();