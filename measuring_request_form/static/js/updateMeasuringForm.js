class UpdateMeasuringForm {
    main() {
        $(document).ready(() => {
            document.getElementById("info-measuring").style.display = "none";
            document.getElementById("button-load").style.display = "none";
            const csrfmiddlewaretoken = document.getElementsByTagName("input")[0];
            const id_request = document.getElementById("id_request");
            const signature_spv = document.getElementById("signature_spv");
            const search_email = document.getElementById("search_email");
            const send_request = document.getElementById("send_request");
            const email = document.getElementById("email");
            const spv_name = document.getElementById("spv_name");
            search_email.onclick = (e) => {
                e.preventDefault();
                $("#modalEmail").modal("show");
            };

            send_request.onclick = (e) => {
                e.preventDefault();
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
            };
        });
    }

    updateDataFromSpv(dataTestLabFromSpv) {
        $(document).ready(function() {
            $.ajax({
                type: "POST",
                url: `/measuring-request-form/update-measuring-request-form/${dataTestLabFromSpv.id_requestField}/`,
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
                            document.getElementById("info-measuring").style.display = "block";
                            document.getElementById("info-measuring").innerText = "Request Measuring Berhasil di Kirim.";
                        }
                    }

                    setTimeout(() => {
                        successResponse();
                    }, 2500);
                },

                error: (xhr, status, error) => {
                    alert(xhr.responseText);
                },

            });
        });
    }

    updateDataFromStaffLab() {
        
    }
    
}

const updateMeasuring = new UpdateMeasuringFormSpv();
updateMeasuring.main();