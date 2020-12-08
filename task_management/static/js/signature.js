class SignatureApproved {
    constructor() {
        this.staffSignatureWrapper = document.getElementById("staff-signature-pad");
        this.staff_signature_canvas = this.staffSignatureWrapper.querySelector("#staff-signature-canvas");
        this.staffSignaturePad = null;
    }

    main() {
        $(document).ready(() => {
            const clear_staff_sign = document.getElementById("clear_staff_sign");
            const undo_staff_sign = document.getElementById("undo_staff_sign");
            const apply_staff_signature = document.getElementById("apply-staff-signature");


            clear_staff_sign.onclick = () => {
                this.clearStaffSign();
            }

            undo_staff_sign.onclick = () => {
                this.undoStaffSign();
            }

            apply_staff_signature.onclick = () => {
                this.applyStaffSignature();
            }

            this.staffSignaturePad = new SignaturePad(this.staff_signature_canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });

        });
    }

    applyStaffSignature() {
        if(this.staffSignaturePad.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            const signature__ = document.getElementById("signature__");
            const dataUrl = this.staffSignaturePad.toDataURL();
            const btn_approved = document.getElementsByClassName("btn-approved")[0].getAttribute( 'id' );
            const splitClass = btn_approved.split('_');
            const id_general = splitClass[splitClass.length - 1];
            signature__.value = dataUrl;
            const signVal = signature__.value;
            this.staffSignaturePad.clear();
            this.updateGeneral(id_general, signVal);
        }
    }

    updateGeneral(id, sign) {
        $.ajax({
            type: "POST",
            url: `update-general-informations/${id}/`,
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                signature: sign 
            },
            success: (response) => {
                if(response['message'] === 'Success') {
                    $("#modal__signature").modal("hide");
                    this.showToast();
                    this.render_data();
                }
            },
            error: (xhr, status, error) => {
                alert(xhr.responseText);
            }
        });
    }

    undoStaffSign() {
        const data = this.staffSignaturePad.toData();
        if(data) {
            data.pop();
            this.staffSignaturePad.fromData(data);
        }
    }

    clearStaffSign() {
        this.staffSignaturePad.clear();
    }


    showToast() {
        const x = document.getElementById("toast");
        document.getElementById("desc").innerText = "Berhasil melakukan signature!";
        x.className = "show";
        setTimeout(() => { 
            x.className = x.className.replace("show", ""); 
        }, 2500);
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
}

const signature = new SignatureApproved();
signature.main();