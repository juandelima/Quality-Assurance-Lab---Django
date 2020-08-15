class Notifications {
    constructor() {
        this.notifications_info_modal = document.getElementById("notifications-info-modal");
        this.notifications_info = document.getElementById("notifications-info");
        this.no_notif = document.getElementById("no_notif");
        this.no_notif_modal = document.getElementById("no_notif_modal");
        this.count_notif = 0;
        this.hasClicked = false;
        this.hasClickedModal = false;
        this.hasNewRecord = false;
        this.hasNewRecordModal = false;
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
                this.infoNotif();
                this.hasClicked = true;
            };
            
            setInterval(() => {
                this.countNotif() 
            }, 1000);
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
            alert(error);
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
            alert(error);
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
        const created_at = data['created_at'];
        const info_notif = data['info_notif'];
        const id_request = data['id_request'];
        let count = 0;
        this.notifications_info.innerHTML = '';
        info_notif.forEach((info, index) => {
            if(index <= 2) {
                this.notifications_info.innerHTML += `
                    <a class="dropdown-item d-flex align-items-center new_task" href="#" id="new_task_${id_request[index]}">
                        <div class="mr-3">
                            <div class="icon-circle bg-primary">
                                <i class="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div class="small text-gray-500">${created_at[index]}</div>
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
        this.notifications_info_modal.innerHTML = '';
        let count = 0;
        info_notif.forEach((info, index) => {
            this.notifications_info_modal.innerHTML += `
                <a class="dropdown-item d-flex align-items-center new_task" href="#" id="new_task_${id_request[index]}" style="white-space: normal;">
                    <div class="mr-3">
                        <div class="icon-circle bg-primary">
                            <i class="fas fa-file-alt text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">${created_at[index]}</div>
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
        new_task_management.innerHTML = '';
        new_task_management.innerHTML += `
            <div class="form-group row">
                <label for="customer" class="col-sm-4 col-form-label">Customer/Supplier</label>
                <div class="col-sm-8">
                    <input type="text" name="customer" class="form-control form-control-sm" id="customer" value="${data['customer']}" readonly>
                </div>
            </div>

            <div class="form-group row" id="simple-date1">
                <label for="simpleDataInput" class="col-sm-4 col-form-label">Received Date</label>
                <div class="col-sm-8">
                    <div class="input-group input-group-sm date">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                        </div>
                        <input type="text" name="received_date" class="form-control" placeholder="01/06/2020" id="simpleDataInput">
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <input type="hidden" name="id_part" class="form-control form-control-sm" id="id_part" value="${data['id_part']}" readonly>
                <label for="part_name" class="col-sm-4 col-form-label">Part Name</label>
                <div class="col-sm-8">
                    <input type="text" name="part_name" class="form-control form-control-sm" id="part_name" value="${data['part']}" readonly>
                </div>
            </div>

            <div class="form-group row">
                <label for="pic_operator" class="col-sm-4 col-form-label">Pic Operator</label>
                <div class="col-sm-8">
                    <select class="select2-single-pic form-control" name="pic_operator" id="pic_operator">
                        <option value="">Select</option>
                        <option value="Matthew Pratama">Matthew Pratama</option>
                        <option value="Praz">Praz</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="inputNote" class="col-sm-4 col-form-label">Note</label>
                <div class="col-sm-8">
                    <textarea class="form-control" name="note" id="inputNote" rows="3"></textarea>
                </div>
            </div>
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