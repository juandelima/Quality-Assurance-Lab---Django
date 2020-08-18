class UpdateMeasuringForm {
    main() {
        $(document).ready(() => {
            document.getElementById("button-load").style.display = "none";
            const csrfmiddlewaretoken = document.getElementsByTagName("input")[0];
            const id_request = document.getElementById("id_request");
            const signature_spv = document.getElementById("signature_spv");
            const signature_staff_lab = document.getElementById("signature_staff_lab");
            const signature_spv_lab = document.getElementById("signature_spv_lab");
            const search_email = document.getElementById("search_email");
            const send_request = document.getElementById("send_request");
            const email = document.getElementById("email");
            const spv_name = document.getElementById("spv_name");
            const staff_lab_name = document.getElementById("staff_lab_name");
            const spv_lab_name = document.getElementById("spv_lab_name");
            const id_applicant_spv = document.getElementById("id_applicant_spv");
            const id_recipient_lab_staff = document.getElementById("id_recipient_lab_staff");
            const id_recipient_lab_spv = document.getElementById("id_recipient_lab_spv");
            const start_testing = document.getElementById("start_testing");
            const time_start_testing = document.getElementById("time_start_testing");
            const end_testing = document.getElementById("end_testing");
            const time_end_testing = document.getElementById("time_end_testing");
            search_email.onclick = (e) => {
                e.preventDefault();
                $("#modalEmail").modal("show");
            };
            
            send_request.onclick = (e) => {
                e.preventDefault();
                if(id_applicant_spv.value === "-1") {
                    if(signature_spv.value == "" || email.value == "") {
                        alert("Tidak dapat di proses. Silahkan cek kembali data inputan kamu yaa :)");
                    } else {
                        const dataTestLabFromSpv = {
                            csrfField: csrfmiddlewaretoken.value,
                            id_requestField: id_request.value,
                            signature_spvField: signature_spv.value,
                            emailField: email.value,
                            spv_nameField: spv_name.value
                        }
                        this.updateDataFromSpv(dataTestLabFromSpv);
                    }
                } else if(id_recipient_lab_staff.value === "-1") {
                    if(signature_staff_lab.value == "" || staff_lab_name.value == "" || email.value == "" || start_testing.value == "" || time_start_testing.value == "" || end_testing.value == "" || time_end_testing.value == "") {
                        alert("Tidak dapat di proses. Silahkan cek kembali data inputan kamu yaa :)");
                    } else {
                        const dataTestLabFromStaffLab = {
                            csrfField: csrfmiddlewaretoken.value,
                            id_requestField: id_request.value,
                            signature_staff_labField: signature_staff_lab.value,
                            emailField: email.value,
                            staff_lab_nameField: staff_lab_name.value,
                            start_testingField: start_testing.value,
                            time_start_testingField: time_start_testing.value,
                            end_testingField: end_testing.value,
                            time_end_testingField: time_end_testing.value,
                        }
                        this.updateDataFromStaffLab(dataTestLabFromStaffLab);
                    }
                } else if(id_recipient_lab_spv.value === "-1") {
                    if(signature_spv_lab.value == "" || spv_lab_name.value == "") {
                        alert("Tidak dapat di proses. Silahkan cek kembali data inputan kamu yaa :)");
                    } else {
                        const dataTestLabFromSpvLab = {
                            csrfField: csrfmiddlewaretoken.value,
                            id_requestField: id_request.value,
                            signature_spv_labField: signature_spv_lab.value,
                            emailField: email.value,
                            spv_lab_nameField: spv_lab_name.value
                        }

                        this.updateDataFromSpvLab(dataTestLabFromSpvLab)
                    }
                }
            };
        });
    }

    updateDataFromSpv(dataTestLabFromSpv) {
        $(document).ready(() => {
            $.ajax({
                type: "POST",
                url: `/measuring-request-form/update-measuring-request-form-spv/${dataTestLabFromSpv.id_requestField}/`,
                data: {
                    csrfmiddlewaretoken: dataTestLabFromSpv.csrfField,
                    id_requestField: dataTestLabFromSpv.id_requestField,
                    signature_spvField: dataTestLabFromSpv.signature_spvField,
                    emailField: dataTestLabFromSpv.emailField,
                    spv_nameField: dataTestLabFromSpv.spv_nameField
                },

                beforeSend: () => {
                    document.getElementById("main-button-request").style.display = "none";
                    document.getElementById("button-load").style.display = "block";
                },

                success: (response) => {
                    function successResponse() {
                        if(response['message'] == 'Success') {
                            document.getElementById("button-load").style.display = "none";
                            document.getElementById("main-button-request").style.display = "block";
                            $("#modalEmail").modal("hide");
                        }
                    }

                    setTimeout(() => {
                        successResponse();
                        this.show_toast();
                    }, 500);
                },

                error: (xhr, status, error) => {
                    alert(xhr.responseText);
                },

            });
        });
    }

    updateDataFromStaffLab(dataTestLabFromStaffLab) {
        $(document).ready(() => {
            $.ajax({
                type: "POST",
                url: `/measuring-request-form/update-measuring-request-form-staff-lab/${dataTestLabFromStaffLab.id_requestField}/`,
                data: {
                    csrfmiddlewaretoken: dataTestLabFromStaffLab.csrfField,
                    id_requestField: dataTestLabFromStaffLab.id_requestField,
                    signature_staff_labField: dataTestLabFromStaffLab.signature_staff_labField,
                    emailField: dataTestLabFromStaffLab.emailField,
                    staff_lab_nameField: dataTestLabFromStaffLab.staff_lab_nameField,
                    start_testingField: dataTestLabFromStaffLab.start_testingField,
                    time_start_testingField: dataTestLabFromStaffLab.time_start_testingField,
                    end_testingField: dataTestLabFromStaffLab.end_testingField,
                    time_end_testingField: dataTestLabFromStaffLab.time_end_testingField
                },

                beforeSend: () => {
                    document.getElementById("main-button-request").style.display = "none";
                    document.getElementById("button-load").style.display = "block";
                },

                success: (response) => {
                    function successResponse() {
                        if(response['message'] == 'Success') {
                            document.getElementById("button-load").style.display = "none";
                            document.getElementById("main-button-request").style.display = "block";
                            $("#modalEmail").modal("hide");
                        }
                    }

                    setTimeout(() => {
                        successResponse();
                        this.show_toast();
                    }, 500);
                },

                error: (xhr, status, error) => {
                    alert(xhr.responseText);
                }
            });
        });
    }

    updateDataFromSpvLab(dataTestLabFromSpvLab) {
        $(document).ready(() => {
            $.ajax({
                type: "POST",
                url: `/measuring-request-form/update-measuring-request-form-spv-lab/${dataTestLabFromSpvLab.id_requestField}/`,
                data: {
                    csrfmiddlewaretoken: dataTestLabFromSpvLab.csrfField,
                    id_requestField: dataTestLabFromSpvLab.id_requestField,
                    signature_spv_labField: dataTestLabFromSpvLab.signature_spv_labField,
                    emailField: dataTestLabFromSpvLab.emailField,
                    spv_lab_nameField: dataTestLabFromSpvLab.spv_lab_nameField,
                },

                beforeSend: () => {
                    document.getElementById("main-button-request").style.display = "none";
                    document.getElementById("button-load").style.display = "block";
                },

                success: (response) => {
                    function successResponse() {
                        if(response['message'] == 'Success') {
                            document.getElementById("button-load").style.display = "none";
                            document.getElementById("main-button-request").style.display = "block";
                            $("#modalEmail").modal("hide");
                        }
                    }

                    setTimeout(() => {
                        successResponse();
                        this.show_toast();
                    }, 500);
                },

                error: (xhr, status, error) => {
                    alert(xhr.responseText);
                }
            });
        });
    }

    show_toast() {
        let x = document.getElementById("toast")
        x.className = "show";
        setTimeout(() => { 
            x.className = x.className.replace("show", ""); 
        }, 8000);
    }
}

const updateMeasuring = new UpdateMeasuringForm();
updateMeasuring.main();