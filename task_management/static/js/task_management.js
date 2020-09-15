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
                                        <label for="inputSupplier_${value.id_task}" class="col-sm-4 col-form-label">Supplier/Customer</label>
                                        <div class="col-sm-8">
                                            <input type="text" id="inputSupplier_${value.id_task}" name="supplier_name"
                                                class="form-control form-control-sm" placeholder="Supp #1" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group row">
                                        <label for="inputQuantity_${value.id_task}" class="col-sm-4 col-form-label">Quantity</label>
                                        <div class="col-sm-8">
                                            <input type="number" min="0" id="inputQuantity_${value.id_task}" name="quantity"
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
                                                class="form-control form-control-sm" placeholder="Mirror Assy Outer RH" readonly>
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
                                                class="form-control form-control-sm" placeholder="QB2MRR-GANTZRBK01" readonly>
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
                                                <option value="1">Tolerance
                                                    Dimension TSZ 2205 G / DTSZ 2205 G</option>
                                                <option value="2">Plastic Molding (HES D0007
                                                    -08)</option>
                                                <option value="3">Rubbers (HES D0020-73)</option>
                                                <option value="4">Periodical</option>
                                                <option value="5">Tolerance By HES D00008 - 08 (Pressing)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <h5 class="modal-title" id="myExtraLargeModalLabel">Measurement Results</h5>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group row">
                                        <label for="inputIlustration_${value.id_task}" class="col-sm-2 col-form-label">Image Ilustration</label>
                                        <div class="col-sm-4">
                                            <input type="file" id="inputIlustration_${value.id_task}" name="image_ilustration"
                                                class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="table-responsive" id="template_by_tolerance_${value.id_task}">
                                    
                                </div>
                            </div>

                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" style="display: none;" id="simpan_general_${value.id_task}" class="btn btn-sm btn-primary">Simpan</button>
                    </div>
                </div>
            </div>
            </div>
            `;
        });

        this.clickTask();
    }

    clickTask() {
        $(document).ready(() => {
            const click_task = $('.click_task');
            click_task.click(function(e) {
                e.preventDefault();
                const get_id = $(this).attr('id');
                const split_id = get_id.split("_");
                const id_task = split_id[split_id.length - 1];
                detailTask(id_task);
            });

            const detailTask = id_task => {
                this.getDataDetailTask(id_task);
            };
        });
    }

    getDataDetailTask(id_task) {
        fetch(`get-detail-task/${id_task}/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.render_data_task(id_task, data);
        })
        .catch(error => {
            alert(error);
        });
    }

    render_data_task(id_task, data) {
        this.standard_tolerance(id_task);
        const inputSupplier = document.getElementById(`inputSupplier_${id_task}`);
        const inputReceived = document.getElementById(`inputReceived_${id_task}`);
        const inputPartName = document.getElementById(`inputPartName_${id_task}`);
        const inputPartNumber = document.getElementById(`inputPartNumber_${id_task}`);
        inputSupplier.value = data.customer_or_supplier;
        inputReceived.value = data.received;
        inputPartName.value = data.part_name;
        inputPartNumber.value = data.part_number;
    }

    standard_tolerance(id_task) {
        const inputStandard = document.getElementById(`inputStandart_${id_task}`);
        const template_by_tolerance = document.getElementById(`template_by_tolerance_${id_task}`);
        inputStandard.onchange = () => {
            const get_value = inputStandard.options[inputStandard.selectedIndex].value;
            if(get_value === "1") {
                alert("coming soon");
                template_by_tolerance.innerHTML = '';
            } else if(get_value === "2") {
                alert("coming soon");
                template_by_tolerance.innerHTML = '';
            } else if(get_value === "3") {
                this.get_rubbbers_tolerance(id_task);
            } else if(get_value === "4") {
                alert("coming soon");
                template_by_tolerance.innerHTML = '';
            } else if(get_value === "5") {
                alert("coming soon");
                template_by_tolerance.innerHTML = '';
            }
        };
    }

    get_rubbbers_tolerance(id_task) {
        fetch(`get-rubbers-tolerance/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.render_template_tolerance(id_task, data['data']);
        })
        .catch(error => {
            alert(error);
        });
    }

    render_template_tolerance(id_task, data_tolerance) {
        const template_by_tolerance = document.getElementById(`template_by_tolerance_${id_task}`);
        const id_rubber = [];
        template_by_tolerance.innerHTML = '';
        template_by_tolerance.innerHTML = `
            <table class="table align-items-center table-flush">
                <thead class="thead-light">
                    <tr>
                        <th width="140">Inspection Item</th>
                        <th width="150">Method/Equip</th>
                        <th width="150">Standart</th>
                        <th width="120">Sample 1</th>
                        <th width="120">Sample 2</th>
                        <th width="120">Sample 3</th>
                        <th width="120">Sample 4</th>
                        <th width="120">Sample 5</th>
                        <th width="100">x</th>
                        <th width="100">r</th>
                        <th>result</th>
                    </tr>
                </thead>

                <tbody id="row_measurements_${id_task}">

                </tbody>
            </table>
        `;

        const row_measurements = document.getElementById(`row_measurements_${id_task}`);
        row_measurements.innerHTML = '';

        data_tolerance.forEach((data, index) => {
            id_rubber.push(data.id_rubber);
            row_measurements.innerHTML += `
                <tr id="row_${data.id_rubber}">
                    <td>
                        ${data.inspection_items}
                    </td>

                    <td>
                        ${data.equip}
                    </td>

                    <td>
                        ${data.standard1.toFixed(1)} ± ${data.standard2}
                    </td>

                    <td>
                        <input type="number" step="0.01" id="sample1_${data.id_rubber}" name="sample1_name" class="form-control form-control-sm sample" placeholder="0" value="0">
                    </td>

                    <td>
                        <input type="number" step="0.01" id="sample2_${data.id_rubber}" name="sample2_name" class="form-control form-control-sm sample" placeholder="0" value="0">
                    </td>

                    <td>
                        <input type="number" step="0.01" id="sample3_${data.id_rubber}" name="sample3_name" class="form-control form-control-sm sample" placeholder="0" value="0">
                    </td>

                    <td>
                        <input type="number" step="0.01" id="sample4_${data.id_rubber}" name="sample4_name" class="form-control form-control-sm sample" placeholder="0" value="0">
                    </td>

                    <td>
                        <input type="number" step="0.01" id="sample5_${data.id_rubber}" name="sample5_name" class="form-control form-control-sm sample" placeholder="0" value="0">
                    </td>

                    <td>
                        <input type="text" id="x_${data.id_rubber}" name="x_result" class="form-control form-control-sm" placeholder="0" readonly>
                    </td>

                    <td>
                        <input type="text" id="r_${data.id_rubber}" name="y_result" class="form-control form-control-sm" placeholder="0" readonly>
                    </td>

                    <td>
                        <input type="text" id="result_${data.id_rubber}" name="result" class="form-control form-control-sm" readonly>
                    </td>
                </tr>
            `;

        });

        template_by_tolerance.innerHTML += `
            <div class="float-right">
                <button type="button" id="compute_rubber_${id_task}" class="btn btn-sm btn-danger compute_rubber">Compute</button>
            </div>
        `;

        this.compute_rubber_tolerance(id_rubber, id_task);
    }

    compute_rubber_tolerance(id_rubber, id_task) {
        const compute = document.getElementById(`compute_rubber_${id_task}`);

        compute.onclick = () => {
            id_rubber.forEach(data_id => {
                var sample1 = document.getElementById(`sample1_${data_id}`);
                var sample2 = document.getElementById(`sample2_${data_id}`);
                var sample3 = document.getElementById(`sample3_${data_id}`);
                var sample4 = document.getElementById(`sample4_${data_id}`);
                var sample5 = document.getElementById(`sample5_${data_id}`);
                this.calculate_rubber(data_id, sample1, sample2, sample3, sample4, sample5);
            });
        };
    }

    calculate_rubber(id_rubber, sample_1, sample_2, sample_3, sample_4, sample_5) {
        fetch(`get-rubbers-tolerance/${id_rubber}/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.result_render(data, sample_1.value, sample_2.value, sample_3.value, sample_4.value, sample_5.value);
        })
        .catch(error => {
            alert(error);
        });
    }

    result_render(data, sample_1, sample_2, sample_3, sample_4, sample_5) {
        const sample1 = document.getElementById(`sample1_${data.id_rubber}`);
        const sample2 = document.getElementById(`sample2_${data.id_rubber}`);
        const sample3 = document.getElementById(`sample3_${data.id_rubber}`);
        const sample4 = document.getElementById(`sample4_${data.id_rubber}`);
        const sample5 = document.getElementById(`sample5_${data.id_rubber}`);
        const x_result = document.getElementById(`x_${data.id_rubber}`);
        const r_result = document.getElementById(`r_${data.id_rubber}`);
        const result = document.getElementById(`result_${data.id_rubber}`);
        const standard2 = data.standard2;
        const standard2_min = -data.standard2;
        if(sample_1 != "0" && sample_1 != "") {
            const calculate_sample1 = sample_1 - data.standard1;
            sample1.value = calculate_sample1.toFixed(2);
            sample1.readOnly = true;
        }

        if(sample_2 != "0" && sample_2 != "") {
            const calculate_sample2 = sample_2 - data.standard1;
            sample2.value = calculate_sample2.toFixed(2);
            sample2.readOnly = true;
        }

        if(sample_3 != "0" && sample_3 != "") {
            const calculate_sample3 = sample_3 - data.standard1;
            sample3.value = calculate_sample3.toFixed(2);
            sample3.readOnly = true;
        }

        if(sample_4 != "0" && sample_4 != "") {
            const calculate_sample4 = sample_4 - data.standard1;
            sample4.value = calculate_sample4.toFixed(2);
            sample4.readOnly = true;
        }

        if(sample_5 != "0" && sample_5 != "") {
            const calculate_sample5 = sample_5 - data.standard1;
            sample5.value = calculate_sample5.toFixed(2);
            sample5.readOnly = true;
        }

        if(sample1.value != "0" && sample1.value != "" && sample2.value != "0" && sample2.value != "" && sample3.value != "0" && sample3.value != "" && sample4.value != "0" && sample4.value != "" && sample5.value != "0" && sample5.value != "") {
            const calculate_x = (parseFloat(sample1.value) + parseFloat(sample2.value) + parseFloat(sample3.value) + parseFloat(sample4.value) + parseFloat(sample5.value)) / 5;
            const find_max = Math.max(sample1.value, sample2.value, sample3.value, sample4.value, sample5.value);
            const find_min = Math.min(sample1.value, sample2.value, sample3.value, sample4.value, sample5.value);
            let result_1 = false;
            let result_2 = false;
            let result_3 = false;
            let result_4 = false;
            let result_5 = false;
            x_result.value = calculate_x.toFixed(2);
            r_result.value = (find_max - find_min).toFixed(2);
            if(parseFloat(sample1.value) < standard2_min || parseFloat(sample1.value) > standard2) {
                result_1 = true;
            }

            if(parseFloat(sample2.value) < standard2_min || parseFloat(sample2.value) > standard2) {
                result_2 = true;
            }

            if(parseFloat(sample3.value) < standard2_min || parseFloat(sample3.value) > standard2) {
                result_3 = true;
            }

            if(parseFloat(sample4.value) < standard2_min || parseFloat(sample4.value) > standard2) {
                result_4 = true;
            }

            if(parseFloat(sample5.value) < standard2_min || parseFloat(sample5.value) > standard2) {
                result_5 = true;
            }

            if(result_1 && result_2 && result_3 && result_4 && result_5) {
                result.value = "X";
            } else {
                result.value = "O";
            }
        }
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