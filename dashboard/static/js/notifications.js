class Notifications {
    constructor() {
        this.notifications_info_modal = document.getElementById("notifications-info-modal");
        this.notifications_info = document.getElementById("notifications-info");
        this.no_notif = document.getElementById("no_notif");
        this.no_notif_modal = document.getElementById("no_notif_modal");
        this.count_notif = 0;
        this.count_task = 0;
        this.hasClicked = false;
        this.hasClickedModal = false;
        this.hasNewRecord = false;
        this.hasNewRecordModal = false;
        this.hasNewRecordTask = false;
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            const alertsDropdown = document.getElementById("alertsDropdown");
            alertsDropdown.onclick = (e) => {
                if(this.hasNewRecord) {
                    this.notifications_info.innerHTML = '';
                    this.haveNotif();
                    this.showSkeletonNotif();
                    this.hasNewRecord = false;
                }
                this.countTask();
                this.infoNotif();
                this.hasClicked = true;
            };
            
            setInterval(() => {
                this.countNotif() 
            }, 1000);
        });
    }

    countTask() {
        fetch(`/count_task/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.countDataTask(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    countNotif() {
        fetch(`/count-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderCountData(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    infoNotif() {
        fetch(`/info-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                this.hideSkeletonNotif();
                this.renderDataInfoNotif(data);
            }, 1000);
        })
        .catch(error => {
            console.log(error);
        });
    }

    showAllInfoNotif() {
        fetch(`/info-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                this.hideSkeletonNotifModal();
                this.renderDataInfoNotifModal(data);
            }, 1000);
        })
        .catch(error => {
            alert(error);
        });
    }


    countDataTask(data) {
        if(data['message'] == "Success") {
            if(this.count_task !== data['count_task']) {
                if(this.hasClicked) {
                    if(data['count_task'] > 0) {
                        this.hasNewRecord = true;
                    }
                    this.notifications_info.innerHTML = '';
                    this.showSkeletonNotif();
                    this.infoNotif();
                    this.haveNotif();
                    this.hasClicked = false;
                }

                if(this.hasClickedModal) {
                    if(data['count_task'] > 0) {
                        this.hasNewRecordModal = true;
                    }
                    this.notifications_info_modal.innerHTML = '';
                    this.showSkeletonNotifModal();
                    this.showAllInfoNotif();
                    this.haveNotifModal();
                    this.hasClickedModal = false;
                }
                this.count_task = data['count_task'];
            }
        }
    }

    renderCountData(data) {
        const count_notif_el = document.getElementById("count_notif");
        let counting;
        if(data['message'] == "Success") {
            if(data['count_notif'] >= 1) {
                if(data['count_notif'] > 3) {
                    counting = `3+`;
                } else {
                    counting = data['count_notif']
                }
                count_notif_el.innerText = counting;
            } else {
                count_notif_el.innerText = '';
            }

            if(this.count_notif !== data['count_notif']) {
                if(this.hasClicked) {
                    if(data['count_notif'] > 0) {
                        this.hasNewRecord = true;
                    }
                    this.notifications_info.innerHTML = '';
                    this.showSkeletonNotif();
                    this.infoNotif();
                    this.haveNotif();
                    this.hasClicked = false;
                }

                if(this.hasClickedModal) {
                    if(data['count_notif'] > 0) {
                        this.hasNewRecordModal = true;
                    }
                    this.notifications_info_modal.innerHTML = '';
                    this.showSkeletonNotifModal();
                    this.showAllInfoNotif();
                    this.haveNotifModal();
                    this.hasClickedModal = false;
                }
                this.count_notif = data['count_notif'];
            }
        }
    }

    renderDataInfoNotif(data) {
        this.notifications_info.innerHTML = '';
        const info_notif = data['info_notif'];
        const created_at = data['created_at'];
        const id_request = data['id_request'];
        const has_fill_task = data['has_fill_task'];
        let indicator_is_read = '';
        let count = 0;
        info_notif.forEach((info, index) => {
            if(index <= 2) {
                if(has_fill_task[index] === false) {
                    indicator_is_read = 'dot';
                } else {
                    indicator_is_read = '';
                }
                this.notifications_info.innerHTML += `
                    <a class="dropdown-item d-flex align-items-center new_task" href="#" id="new_task_${id_request[index]}">
                        <div class="mr-3">
                            <div class="icon-circle bg-primary">
                                <i class="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="small text-gray-500">${created_at[index]}</div>
                                <div class="${indicator_is_read}"></div>
                            </div>
                            <span class="font-weight-bold">
                                ${info}
                            </span>
                        </div>
                    </a>
                `;               
            }
            count += 1;
        });

        
        this.notifications_info.innerHTML += `
            <a class="dropdown-item text-center small text-gray-500" href="" id="show_all_notif">Show All Notifications</a>
        `;
            
        const show_all_notif = document.getElementById("show_all_notif");
        show_all_notif.onclick = (e) => {
            if(this.hasNewRecordModal) {
                this.notifications_info_modal.innerHTML = '';
                this.haveNotifModal();
                this.showSkeletonNotifModal();
                this.hasNewRecordModal = false;
            }
            this.showAllInfoNotif();
            this.countTask();
            this.hasClickedModal = true;
        };

        if(count > 0) {
            this.haveNotif();
        } else {
            this.noNotif();
        }

        this.showAllNotif();
            
        this.clickNotif();
        
    }

    renderDataInfoNotifModal(data) {
        const created_at = data['created_at'];
        const info_notif = data['info_notif'];
        const id_request = data['id_request'];
        const has_fill_task = data['has_fill_task'];
        this.notifications_info_modal.innerHTML = '';
        let indicator_is_read = '';
        let count = 0;
        info_notif.forEach((info, index) => {
            if(has_fill_task[index] === false) {
                indicator_is_read = 'dot';
            } else {
                indicator_is_read = '';
            }
            this.notifications_info_modal.innerHTML += `
                <a class="dropdown-item d-flex align-items-center new_task" href="#" id="new_task_${id_request[index]}" style="white-space: normal;">
                    <div class="mr-3">
                        <div class="icon-circle bg-primary">
                            <i class="fas fa-file-alt text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="small text-gray-500">${created_at[index]}</div>
                            <div class="${indicator_is_read}"></div>
                        </div>
                        <span class="font-weight-bold">
                            ${info}
                        </span>
                    </div>
                </a>
            `;
            count += 1;
        });

        if(count > 0) {
            this.haveNotifModal();
        } else {
            this.noNotifModal();
        }

        this.clickNotif();
    }


    renderDataDetailNotif(data) {
        const new_task_management = document.getElementById("new_task_management");
        let pic_operator;
        let received_date;
        let note;
        if(data['pic_operator'] !== null) {
            document.getElementById("save_task_management").style.display = "none";
            pic_operator = `
                <div class="form-group row">
                    <label for="pic_operator" class="col-sm-4 col-form-label">Pic Operator</label>
                    <div class="col-sm-8">
                        <select class="select2-single-pic form-control" name="pic_operator" id="pic_operator" disabled>
                            <option value="${data['pic_operator']}">${data['pic_operator']}</option>
                        </select>
                    </div>
                </div>
            `;
        } else {
            document.getElementById("save_task_management").style.display = "block";
            pic_operator = `
                <div class="form-group row">
                    <label for="pic_operator" class="col-sm-4 col-form-label">Pic Operator</label>
                    <div class="col-sm-8">
                        <select class="select2-single-pic form-control" name="pic_operator" id="pic_operator">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
            `;
        }

        if(data['received_date'] !== null) {
            received_date = `
                <div class="form-group row" id="simple-date1">
                    <label for="received_date" class="col-sm-4 col-form-label">Received Date</label>
                    <div class="col-sm-8">
                        <div class="input-group input-group-sm date">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                            </div>
                            <input type="text" name="received_date" class="form-control" placeholder="01/06/2020" value="${data['received_date']}" id="received_date" disabled>
                        </div>
                    </div>
                </div>
            `
        } else {
            received_date = `
                <div class="form-group row" id="simple-date1">
                    <label for="received_date" class="col-sm-4 col-form-label">Received Date</label>
                    <div class="col-sm-8">
                        <div class="input-group input-group-sm date">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                            </div>
                            <input type="text" name="received_date" class="form-control" placeholder="01/06/2020" id="received_date">
                        </div>
                    </div>
                </div>
            `
        }

        if(data['note'] !== null) {
            note = `
                <div class="form-group row">
                    <label for="inputNote" class="col-sm-4 col-form-label">Note</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" name="note" id="inputNote" rows="3" disabled>${data['note']}</textarea>
                    </div>
                </div>
            `;
        } else {
            note = `
                <div class="form-group row">
                    <label for="inputNote" class="col-sm-4 col-form-label">Note</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" name="note" id="inputNote" rows="3"></textarea>
                    </div>
                </div>
            `;
        }

        new_task_management.innerHTML = '';
        new_task_management.innerHTML += `
        <input type="hidden" name="id_request_form" class="form-control form-control-sm" id="id_request_form" value="${data['id_request_form']}" readonly>
            <div class="form-group row">
                <label for="customer" class="col-sm-4 col-form-label">Customer/Supplier</label>
                <div class="col-sm-8">
                    <input type="text" name="customer" class="form-control form-control-sm" id="customer" value="${data['customer']}" readonly>
                </div>
            </div>
            ${received_date}
            <div class="form-group row">
                <input type="hidden" name="id_part" class="form-control form-control-sm" id="id_part" value="${data['id_part']}" readonly>
                <label for="part_name" class="col-sm-4 col-form-label">Part Name</label>
                <div class="col-sm-8">
                    <input type="text" name="part_name" class="form-control form-control-sm" id="part_name" value="${data['part']}" readonly>
                </div>
            </div>
            ${pic_operator}
            ${note}
        `;
    }

    widgets() {
        $('#simple-date1 .input-group-sm.date').datepicker({
            format: 'dd/mm/yyyy',
            todayBtn: 'linked',
            todayHighlight: true,
            autoclose: true        
        });

        $('.select2-single-pic').select2({
            placeholder: "Select a User",
            allowClear: true,
            width: '100%'
        });
    }

    getEmployees() {
        fetch(`/measuring-request-form/applicantsandrecipients`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderDataPic(data);
        })
        .catch(error => {
            alert(error);
        });
    } 

    renderDataPic(data) {
        const pic_operator = document.getElementById("pic_operator");
        const id_employee = data.id_employee;
        const nama = data.nama;
        const email = data.email;
        nama.forEach((name, index) => {
            if(email[index] !== null) {
                pic_operator[index+1] = new Option(name, id_employee[index]);
            }
        }); 
    }

    
    clickNotif() {
        $(document).ready(() => {
            const click_notif = $(".new_task");
            click_notif.click(function(e) {
                e.preventDefault();
                const get_id = $(this).attr('id');
                const split_id = get_id.split("_");
                const id_request = split_id[split_id.length - 1];
                showInfoNotifById(id_request);
            });

            const showInfoNotifById = id_request => {
                this.hide_task_management();
                fetch(`/detail-info-notif/${id_request}/`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.show_skeleton_new_task();
                    if(this.hasClickedModal) {
                        $("#modal-notif").modal("hide");
                    }
                    $("#create_new_task").modal("show");
                    setTimeout(() => {
                        this.renderDataDetailNotif(data);
                        this.hide_skeleton_new_task();
                        this.show_task_management();
                        this.widgets();
                        this.getEmployees();
                    }, 1000);
                })
                .catch(error => {
                    alert(error);
                });
            };

            $(".close__modal").click(() => {
                $("#create_new_task").modal("hide");
                if(this.hasClickedModal) {
                    $("#modal-notif").modal("show");
                }
            });
        });
    }


    showAllNotif() {
        $(document).ready(() => {
            const show_all_notif = $("#show_all_notif");
            show_all_notif.click((e) => {
                e.preventDefault();
                $("#modal-notif").modal("show");
            });
        });
    }

    hideSkeletonNotif() {
        return document.getElementById("skeleton_notif").style.display = "none";
    }

    showSkeletonNotif() {
        return document.getElementById("skeleton_notif").style.display = "block";
    }

    hideSkeletonNotifModal() {
        return document.getElementById("skeleton_notif_modal").style.display = "none";
    }

    showSkeletonNotifModal() {
        return document.getElementById("skeleton_notif_modal").style.display = "block";
    }

    show_task_management() {
        return document.getElementById("new_task_management").style.display = "block";
    }

    hide_task_management() {
        document.getElementById("new_task_management").style.display = "none";
    }

    show_skeleton_new_task() {
        return document.getElementById("skeleton_new_task").style.display = "block";
    }

    hide_skeleton_new_task() {
        return document.getElementById("skeleton_new_task").style.display = "none"; 
    }

    noNotif() {
        return this.no_notif.style.display = "block";
    }

    haveNotif() {
        return this.no_notif.style.display = "none";
    }

    noNotifModal() {
        return this.no_notif_modal.style.display = "block";
    }

    haveNotifModal() {
        return this.no_notif_modal.style.display = "none";
    }
}

const notif = new Notifications();
notif.main();