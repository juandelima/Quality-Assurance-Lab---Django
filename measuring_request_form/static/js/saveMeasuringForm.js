class MeasuringRequestForm {
    main() {
        $(document).ready(() => {
            document.getElementById("button-load").style.display = "none";
            const csrfmiddlewaretoken = document.getElementsByTagName("input")[0];
            const id_part = document.getElementById("id_part");
            const address = document.getElementById("address");
            const qty_of_cavity = document.getElementById("qty_of_cavity");
            const qty_of_part = document.getElementById("qty_of_part");
            const drawing = document.getElementById("drawing");
            const testing = document.getElementById("testing");
            const supplier_complementary = document.getElementById("supplier_complementary");
            const other_complementary = document.getElementById("other_complementary");
            const new_part = document.getElementById("new_part");
            const regular_part = document.getElementById("regular_part");
            const periodical = document.getElementById("periodical");
            const change_material = document.getElementById("change_material");
            const others_part_status = document.getElementById("others_part_status");
            const all_dimension = document.getElementById("all_dimension");
            const critical_points = document.getElementById("critical_points");
            const dimension = document.getElementById("dimension");
            const others_measuring = document.getElementById("others_measuring");
            const salt_spray = document.getElementById("salt_spray");
            const cass_test = document.getElementById("cass_test");
            const distortion_test = document.getElementById("distortion_test");
            const painting_test = document.getElementById("painting_test");
            const impact_test = document.getElementById("impact_test");
            const tensile_test = document.getElementById("tensile_test");
            const hardness_test = document.getElementById("hardness_test");
            const bending_test = document.getElementById("bending_test");
            const others_testing = document.getElementById("others_testing");
            const note_measuring = document.getElementById("note_measuring");
            const signature_staff = document.getElementById("signature_staff");
            const staff_name = document.getElementById("staff_name");
            const search_email = document.getElementById("search_email");
            const send_request = document.getElementById("send_request");
            const email = document.getElementById("email");
            search_email.onclick = (e) => {
                e.preventDefault();
                $("#modalEmail").modal("show");
            };

            send_request.onclick = (e) => {
                e.preventDefault();
                if(signature_staff.value == "" || staff_name.value == "" || email.value == "") {
                    alert("Tidak dapat di proses. Silahkan cek kembali data inputan kamu yaa :)");
                } else {
                    const dataTestLab = {
                        csrfField: csrfmiddlewaretoken.value,
                        id_partField: id_part.value,
                        addressField: address.value,
                        qty_of_cavityField: qty_of_cavity.value,
                        qty_of_partField: qty_of_part.value,
                        drawingField: drawing.value,
                        testingField: testing.value,
                        supplier_complementaryField: supplier_complementary.value,
                        other_complementaryField: other_complementary.value,
                        new_partField: new_part.value,
                        regular_partField: regular_part.value,
                        periodicalField: periodical.value,
                        change_materialField: change_material.value,
                        others_part_statusField: others_part_status.value,
                        all_dimensionField: all_dimension.value,
                        critical_pointsField: critical_points.value,
                        dimensionField: dimension.value,
                        others_measuringField: others_measuring.value,
                        salt_sprayField: salt_spray.value,
                        cass_testField: cass_test.value,
                        distortion_testField: distortion_test.value,
                        painting_testField: painting_test.value,
                        impact_testField: impact_test.value,
                        tensile_testField: tensile_test.value,
                        hardness_testField: hardness_test.value,
                        bending_testField: bending_test.value,
                        others_testingField: others_testing.value,
                        note_measuringField: note_measuring.value,
                        signature_staffField: signature_staff.value,
                        staff_nameField: staff_name.value,
                        emailField: email.value
                    };

                    this.sendDataForm(dataTestLab);
                }
            }
        });
    }

    sendDataForm(dataTestLab) {
        $(document).ready(() => {
            $.ajax({
                type: "POST",
                url: "save-measuring-request-form/",
                data: {
                    csrfmiddlewaretoken: dataTestLab.csrfField,
                    id_partField: dataTestLab.id_partField,
                    addressField: dataTestLab.addressField,
                    qty_of_cavityField: dataTestLab.qty_of_cavityField,
                    qty_of_partField: dataTestLab.qty_of_partField,
                    drawingField: dataTestLab.drawingField,
                    testingField: dataTestLab.testingField,
                    supplier_complementaryField: dataTestLab.supplier_complementaryField,
                    other_complementaryField: dataTestLab.other_complementaryField,
                    new_partField: dataTestLab.new_partField,
                    regular_partField: dataTestLab.regular_partField,
                    periodicalField: dataTestLab.periodicalField,
                    change_materialField: dataTestLab.change_materialField,
                    others_part_statusField: dataTestLab.others_part_statusField,
                    all_dimensionField: dataTestLab.all_dimensionField,
                    critical_pointsField: dataTestLab.critical_pointsField,
                    dimensionField: dataTestLab.dimensionField,
                    others_measuringField: dataTestLab.others_measuringField,
                    salt_sprayField: dataTestLab.salt_sprayField,
                    cass_testField: dataTestLab.cass_testField,
                    distortion_testField: dataTestLab.distortion_testField,
                    painting_testField: dataTestLab.painting_testField,
                    impact_testField: dataTestLab.impact_testField,
                    tensile_testField: dataTestLab.tensile_testField,
                    hardness_testField: dataTestLab.hardness_testField,
                    bending_testField: dataTestLab.bending_testField,
                    others_testingField: dataTestLab.others_testingField,
                    note_measuringField: dataTestLab.note_measuringField,
                    signature_staffField: dataTestLab.signature_staffField,
                    staff_nameField: dataTestLab.staff_nameField,
                    emailField: dataTestLab.emailField
                },

                beforeSend: () => {
                    document.getElementById("main-button-request").style.display = "none";
                    document.getElementById("button-load").style.display = "block";
                },

                success: (response) => {
                    function successResponse() {
                        if(response['message'] == 'Success') {
                            $("#modalEmail").modal("hide");
                            document.getElementById("button-load").style.display = "none";
                            document.getElementById("main-button-request").style.display = "block";
                        }
                    }

                    setTimeout(() => {
                        successResponse();
                        this.show_toast();
                    }, 500);
                },

                complete: () => {
                    document.getElementById("id_part").value = "";
                    document.getElementById("part_name").value = "";
                    document.getElementById("part_no").value = "";
                    document.getElementById("type").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("qty_of_cavity").value = "0";
                    document.getElementById("qty_of_part").value = "0";
                    document.getElementById("drawing").checked = false;
                    document.getElementById("testing").checked = false;
                    document.getElementById("supplier_complementary").checked = false;
                    document.getElementById("others").checked = false;
                    document.getElementById("new_part").checked = false;
                    document.getElementById("regular_part").checked = false;
                    document.getElementById("periodical").checked = false;
                    document.getElementById("change_material").checked = false;
                    document.getElementById("other_part_status").checked = false;
                    document.getElementById("all_dimension").checked = false;
                    document.getElementById("critical_points").checked = false;
                    document.getElementById("dimension").checked = false;
                    document.getElementById("other_measuring").checked = false;
                    document.getElementById("salt_spray").checked = false;
                    document.getElementById("cass_test").checked = false;
                    document.getElementById("distortion_test").checked = false;
                    document.getElementById("painting_test").checked = false;
                    document.getElementById("impact_test").checked = false;
                    document.getElementById("tensile_test").checked = false;
                    document.getElementById("hardness_test").checked = false;
                    document.getElementById("bending_test").checked = false;
                    document.getElementById("other_testing").checked = false;
                    document.getElementById("note_measuring").value = "";
                    document.getElementById("signature_staff").value = "";
                    document.getElementById("signature-staff").innerHTML = "";
                    document.getElementById("other_value").style.display = "none";
                    document.getElementById("other_complementary").value = "";
                    document.getElementById("other_value_part_status").style.display = "none";
                    document.getElementById("others_part_status").value = "";
                    document.getElementById("other_value_measuring").style.display = "none";
                    document.getElementById("others_measuring").value = "";
                    document.getElementById("other_value_testing").style.display = "none";
                    document.getElementById("others_testing").value = "";
                    document.getElementById("staff_dept_name").value = "";
                    document.getElementById("spv_dept_name").value = "";
                    document.getElementById("email").value = "";
                },

                error: (xhr, status, error) => {
                    alert(xhr.responseText);
                },
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

const measuringRequestForm = new MeasuringRequestForm();
measuringRequestForm.main();