class Signature {
    constructor() {
        this.staffSignatureWrapper = document.getElementById("staff-signature-pad");
        this.spvSignatureWrapper = document.getElementById("spv-signature-pad");
        this.staffLabSignatureWrapper = document.getElementById("staff-lab-signature-pad");
        this.spvLabSignatureWrapper = document.getElementById("spv-lab-signature-pad");
        this.staff_signature_canvas = this.staffSignatureWrapper.querySelector("#staff-signature-canvas");
        this.spv_signature_canvas = this.spvSignatureWrapper.querySelector("#spv-signature-canvas");
        this.staff_lab_signature_canvas = this.staffLabSignatureWrapper.querySelector("#staff-lab-signature-canvas");
        this.spv_lab_signature_canvas = this.spvLabSignatureWrapper.querySelector("#spv-lab-signature-canvas");
        this.staffSignaturePad = null;
        this.spvSignaturePad = null;
        this.staffLabSignaturePad = null;
        this.spvLabSignaturePad = null;
    }

    staff() {
        $(document).ready(() => {
            const signature_staff = document.getElementById("signature-staff");
            const clear_staff_sign = document.getElementById("clear_staff_sign");
            const undo_staff_sign = document.getElementById("undo_staff_sign");
            const apply_staff_signature = document.getElementById("apply-staff-signature");

            signature_staff.onclick = () => {
                $("#modal-staff-signature").modal("show");
            }

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
            let signature_staff = document.getElementById("signature-staff");
            let sign_staff = document.getElementById("signature_staff");
            let dataUrl = this.staffSignaturePad.toDataURL();
            let img = new Image();
            signature_staff.innerHTML = "";
            signature_staff.classList.add("text-center");
            img.height = 75;
            img.width = 150;
            img.src = dataUrl;
            signature_staff.appendChild(img);
            sign_staff.value = dataUrl;
            $("#modal-staff-signature").modal("hide");
        }
    }

    undoStaffSign() {
        let data = this.staffSignaturePad.toData();
        if(data) {
            data.pop();
            this.staffSignaturePad.fromData(data);
        }
    }

    clearStaffSign() {
        this.staffSignaturePad.clear();
    }

    spv() {
        $(document).ready(() => {
            const signature_spv = document.getElementById("signature-spv");
            const clear_spv_sign = document.getElementById("clear_spv_sign");
            const undo_spv_sign = document.getElementById("undo_spv_sign");
            const apply_spv_signature = document.getElementById("apply-spv-signature");

            signature_spv.onclick = () => {
                $("#modal-spv-signature").modal("show");
            }

            clear_spv_sign.onclick = () => {
                this.clearSpvSign();
            }

            undo_spv_sign.onclick = () => {
                this.undoSpvSign();
            }

            apply_spv_signature.onclick = () => {
                this.applySpvSignature();
            }

            this.spvSignaturePad = new SignaturePad(this.spv_signature_canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });
        });
    }

    applySpvSignature() {
        if(this.spvSignaturePad.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            let signature_spv = document.getElementById("signature-spv");
            let sign_spv = document.getElementById("signature_spv");
            let dataUrl = this.spvSignaturePad.toDataURL();
            let img = new Image();
            signature_spv.innerHTML = "";
            signature_spv.classList.add("text-center");
            img.height = 75;
            img.width = 150;
            img.src = dataUrl;
            signature_spv.appendChild(img);
            sign_spv.value = dataUrl;
            $("#modal-spv-signature").modal("hide");
        }
    }

    undoSpvSign() {
        let data = this.spvSignaturePad.toData();
        if(data) {
            data.pop();
            this.spvSignaturePad.fromData(data);
        }
    }

    clearSpvSign() {
        this.spvSignaturePad.clear();
    }

    staffLab() {
        $(document).ready(() => {
            const signature_staff_lab = document.getElementById("signature-staff-lab");
            const clear_staff_lab_sign = document.getElementById("clear_staff_lab_sign");
            const undo_staff_lab_sign = document.getElementById("undo_staff_lab_sign");
            const apply_staff_lab_signature = document.getElementById("apply-staff-lab-signature");

            signature_staff_lab.onclick = () => {
                $("#modal-staff-lab-signature").modal("show");
            }

            clear_staff_lab_sign.onclick = () => {
                this.clearStaffLabSign();
            }

            undo_staff_lab_sign.onclick = () => {
                this.undoStaffLabSign();
            }

            apply_staff_lab_signature.onclick = () => {
                this.applyStaffLabSignature();
            }

            this.staffLabSignaturePad = new SignaturePad(this.staff_lab_signature_canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });
        });
    }

    applyStaffLabSignature() {
        if(this.staffLabSignaturePad.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            let signature_staff_lab = document.getElementById("signature-staff-lab");
            let sign_staff_lab = document.getElementById("signature_staff_lab");
            let dataUrl = this.staffLabSignaturePad.toDataURL();
            let img = new Image();
            signature_staff_lab.innerHTML = "";
            signature_staff_lab.classList.add("text-center");
            img.height = 75;
            img.width = 150;
            img.src = dataUrl;
            signature_staff_lab.appendChild(img);
            sign_staff_lab.value = dataUrl;
            $("#modal-staff-lab-signature").modal("hide");
        }
    }

    undoStaffLabSign() {
        let data = this.staffLabSignaturePad.toData();
        if(data) {
            data.pop();
            this.staffLabSignaturePad.fromData(data);
        }
    }

    clearStaffLabSign() {
        this.staffLabSignaturePad.clear();
    }


    spvLab() {
        $(document).ready(() => {
            const signature_spv_lab = document.getElementById("signature-spv-lab");
            const clear_spv_lab_sign = document.getElementById("clear_spv_lab_sign");
            const undo_spv_lab_sign = document.getElementById("undo_spv_lab_sign");
            const apply_spv_lab_signature = document.getElementById("apply-spv-lab-signature");

            signature_spv_lab.onclick = () => {
                $("#modal-spv-lab-signature").modal("show");
            }

            clear_spv_lab_sign.onclick = () => {
                this.clearSpvLabSign();
            }

            undo_spv_lab_sign.onclick = () => {
                this.undoSpvLabSign();
            }

            apply_spv_lab_signature.onclick = () => {
                this.applySpvSLabignature();
            }

            this.spvLabSignaturePad = new SignaturePad(this.spv_lab_signature_canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });
        }); 
    }

    applySpvSLabignature() {
        if(this.spvLabSignaturePad.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            let signature_spv_lab = document.getElementById("signature-spv-lab");
            let sign_spv_lab = document.getElementById("signature_spv_lab");
            let dataUrl = this.spvLabSignaturePad.toDataURL();
            let img = new Image();
            signature_spv_lab.innerHTML = "";
            signature_spv_lab.classList.add("text-center");
            img.height = 75;
            img.width = 150;
            img.src = dataUrl;
            signature_spv_lab.appendChild(img);
            sign_spv_lab.value = dataUrl;
            $("#modal-spv-lab-signature").modal("hide");
        }
    }

    undoSpvLabSign() {
        let data = this.spvLabSignaturePad.toData();
        if(data) {
            data.pop();
            this.spvLabSignaturePad.fromData(data);
        }
    }

    clearSpvLabSign() {
        this.spvLabSignaturePad.clear();
    }
    
    main() {
        this.staff();
        this.spv();
        this.staffLab();
        this.spvLab();
    }
}

const signature = new Signature();
signature.main();