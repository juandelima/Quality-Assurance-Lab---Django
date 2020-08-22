$(document).ready(function () {

    $("#supplier_label").css("display", "none");
    
    $("#customer").click(function() {
        $("#supplier_label").css("display", "none");
        $("#customer_label").css("display", "block");
        $("#type").css("display", "block");
        $("#inputPart").html("");
        $("#inputPart").prop("disabled", true);
    });

    $("#suplier").click(function() {
        $("#supplier_label").css("display", "block");
        $("#customer_label").css("display", "none");
        $("#type").css("display", "none");
        $("#inputPart").html("");
        $("#inputPart").prop("disabled", true);
    });

    $("#standart2_1").click(function() {
        $("#general_infomration").modal('hide');
        $("#tolerance").modal('show');
    });

    $(".close_tolerance").click(function() {
        $("#tolerance").modal('hide');
        $("#general_infomration").modal('show');
    });

    $("#spesifically_a").css("display", "none");
    $("#common_a").css("display", "none");

    $("#spesifically").click(function() {
        $("#common_value").val(0);
        $("#spesifically_a").css("display", "block");
        $("#common_a").css("display", "none");
    });

    $("#common").click(function() {
        $("#spesifically_plus").val(0);
        $("#spesifically_minus").val(0);
        $("#common_a").css("display", "block");
        $("#spesifically_a").css("display", "none");
    });

    $("#inputCommon").change(function(e) {
        let common_value = $(e.target).val();
        if(common_value == "1") {
            $("#common_value").val(0.12);
        } else if(common_value == "2") {
            $("#common_value").val(0.22);
        } else if(common_value == "3") {
            $("#common_value").val(1);
        } else if(common_value == "4") {
            $("#common_value").val(30);
        } else {
            $("#common_value").val(0);
        }
    });

    $("#insert_tolerance").click(function() {
        let spesifically_minus = $("#spesifically_minus").val();
        let spesifically_plus = $("#spesifically_plus").val();
        let common_value = $("#common_value").val();
        if(common_value !== "0") {
            $("#standart2_1").val(common_value);
        } else if(spesifically_minus !== "0" || spesifically_plus !== "0") {
            $("#standart2_1").val(`${spesifically_plus} | ${spesifically_minus}`);
        }

        $("#tolerance").modal('hide');
        $("#general_infomration").modal('show');
    });

    let row = 2;
    $("#tambah_row").click(function(e) {
        e.preventDefault();
        
        let tolerance = '';
        let html = '';
        html += `
        <tr id="row_${row}">
            <td>
                <input type="text" id="inpection_${row}" name="inpection_name" class="form-control form-control-sm" placeholder="Distance">
            </td>

            <td>
                <input type="text" id="method_${row}" name="method_name" class="form-control form-control-sm" placeholder="CMM">
            </td>

            <td>
                <input type="text" id="sample1_${row}" name="sample1_name" class="form-control form-control-sm" placeholder="0" readonly>
            </td>

            <td>
                <input type="text" id="sample2_${row}" name="sample2_name" class="form-control form-control-sm" placeholder="0" readonly>
            </td>

            <td>
                <input type="text" id="sample3_${row}" name="sample3_name" class="form-control form-control-sm" placeholder="0" readonly>
            </td>

            <td>
                <input type="text" id="sample4_${row}" name="sample4_name" class="form-control form-control-sm" placeholder="0" readonly>
            </td>

            <td>
                <input type="text" id="sample5_${row}" name="sample5_name" class="form-control form-control-sm" placeholder="0" readonly>
            </td>

            <td>
                <div class="row">
                    <div class="col-sm-5">
                        <input type="text" id="standart1_${row}" name="standart1_name" class="form-control form-control-sm" placeholder="0">
                    </div>
                    <span>±</span>
                    <div class="col-sm-5">
                        <input type="text" id="standart2_${row}" name="standart2_name" class="form-control form-control-sm" placeholder="0">
                    </div>
                </div>
            </td>

            <td>
                <button class="btn btn-danger btn-sm btn-icon-split" id="btn_delete_${row}">
                    <span class="icon text-white-50">
                        <i class="fa fa-trash"></i>
                    </span>
                    <span class="text">Delete</span>
                </button>
            </td>
        </tr>   
        `;

        tolerance = `
        <div class="modal fade" id="tolerance_${row}" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel_${row}">Tolerance</h5>
                        <button type="button" class="close close_tolerance_${row}" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">

                        <fieldset class="form-group">
                            <div class="row">
                                <legend class="col-form-label col-sm-4 pt-0">Tolerance Type</legend>
                                <div class="col-sm-4">
                                    <div class="custom-control">
                                        <input type="radio" id="spesifically_${row}" name="tolerance_${row}">
                                        <label for="spesifically_${row}">Spesifically</label>
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="custom-control">
                                        <input type="radio" id="common_${row}" name="tolerance_${row}">
                                        <label for="common_${row}">Common</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <div id="spesifically_a_${row}">
                            <div class="form-group row">
                                <label for="spesifically_a_${row}" class="col-sm-4 col-form-label">Tolerance (a)</label>
                                <div class="col-sm-8">
                                    <div class="form-group row">
                                        <label for="spesifically_plus_${row}" class="col-sm-2 col-form-label">Plus</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control form-control-sm" value="0" id="spesifically_plus_${row}">
                                        </div>

                                        <label for="spesifically_minus_${row}" class="col-sm-2 col-form-label">Minus</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control form-control-sm" value="0" id="spesifically_minus_${row}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="common_a_${row}">
                            <div class="form-group row">
                                <label for="common_a_${row}" class="col-sm-4 col-form-label">Tolerance (a)</label>
                                <div class="col-sm-8">
                                    <div class="form-group row">
                                        <div class="col-sm-6">
                                            <select class="select2-single-placeholder7_${row} form-control" name="common_type" id="inputCommon_${row}">
                                                <option value="">Select</option>
                                                <option value="1">For General(a)</option>
                                                <option value="2">For General(a, b)</option>
                                                <option value="3">For Radius</option>
                                                <option value="4">For Angular</option>
                                            </select>
                                        </div>

                                        <div class="col-sm-4">
                                            <input type="text" class="form-control form-control-sm" value="0" id="common_value_${row}">
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="close_tolerance_${row} btn btn-outline-primary btn-sm">Close</button>
                        <button type="button" id="insert_tolerance_${row}" class="btn btn-primary btn-sm">Insert</button>
                    </div>

                </div>
            </div>
        </div>
        `;

        $("#row_measurements").append(html);
        $("#modal_tolerance").append(tolerance);

        $("#row_measurements").on('click', `#btn_delete_${row}`, function(e) {
            let id_btn = $(this).attr('id');
            let split_id_btn = id_btn.split('_');
            let last_elem = split_id_btn[split_id_btn.length - 1];
            alert("Are you sure delete this the row?");
            $(`#row_${last_elem}`).remove();
        });

        $("#modal_tolerance").find(`.select2-single-placeholder7_${row}`).select2({
            placeholder: "Select a Common Type",
            allowClear: true,
            width: '100%'
        });

        $("#row_measurements").on('click', `#standart2_${row}`, function(e) {
            let id_standart = $(this).attr('id');
            let split_id_standart = id_standart.split('_');
            let last_elem = split_id_standart[split_id_standart.length - 1];
            
            $("#modal_tolerance").find(`.close_tolerance_${last_elem}`).click(function() {
                $(`#tolerance_${last_elem}`).modal('hide');
                $("#general_infomration").modal('show');
            });

            $(`#spesifically_a_${last_elem}`).css("display", "none");
            $(`#common_a_${last_elem}`).css("display", "none");
            $("#general_infomration").modal('hide');
            $("#modal_tolerance").find(`#tolerance_${last_elem}`).modal('show');

            $(`#spesifically_${last_elem}`).click(function() {
                $(`#spesifically_a_${last_elem}`).css("display", "block");
                $(`#common_a_${last_elem}`).css("display", "none");
            });

            $(`#common_${last_elem}`).click(function() {
                $(`#spesifically_a_${last_elem}`).css("display", "none");
                $(`#common_a_${last_elem}`).css("display", "block");
            });

            $(`#inputCommon_${last_elem}`).change(function(e) {
                let common_value = $(e.target).val();
                if(common_value == "1") {
                    $(`#common_value_${last_elem}`).val(0.12);
                } else if(common_value == "2") {
                    $(`#common_value_${last_elem}`).val(0.22);
                } else if(common_value == "3") {
                    $(`#common_value_${last_elem}`).val(1);
                } else if(common_value == "4") {
                    $(`#common_value_${last_elem}`).val(30);
                } else {
                    $(`#common_value_${last_elem}`).val(0);
                }
            });

            $("#modal_tolerance").find(`#insert_tolerance_${last_elem}`).click(function() {
                let spesifically_minus = $(`#spesifically_minus_${last_elem}`).val();
                let spesifically_plus = $(`#spesifically_plus_${last_elem}`).val();
                let common_value = $(`#common_value_${last_elem}`).val();
                if(common_value !== "0") {
                    $(`#standart2_${last_elem}`).val(common_value);
                } else if(spesifically_minus !== "0" || spesifically_plus !== "0") {
                    $(`#standart2_${last_elem}`).val(`${spesifically_plus} | ${spesifically_minus}`);
                }
                $(`#tolerance_${last_elem}`).modal('hide');
                $("#general_infomration").modal('show');
            });            

        });

        row += 1;
    });
});