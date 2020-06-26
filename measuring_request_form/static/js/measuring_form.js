$(document).ready(function () {
    $('#inputPartMeasure5').TouchSpin({
        min: 0,
        max: 100,                
        boostat: 5,
        maxboostedstep: 10,        
        initval: 0
    });

    $('#inputPartMeasure6').TouchSpin({
        postfix: "/ Cavity",
        min: 0,
        max: 100,                
        boostat: 5,
        maxboostedstep: 10,        
        initval: 0
    });

    $("#supplier_form").css("display", "none");
    $("#other_value").css("display", "none");
    $("#other_value_part_status").css("display", "none");
    $("#other_value_measuring").css("display", "none");
    $("#other_value_testing").css("display", "none");

    $("#inputTypeForm").change(function(e) {
        let value = $(e.target).val();
        if(value == "1") {
            $("#customer_form").css("display", "block");
            $("#supplier_form").css("display", "none");
        } else {
            if(value == "2") {
                $("#customer_form").css("display", "none");
                $("#supplier_form").css("display", "block");
            }
        }
    });

    $("#others").change(function() {
        if($(this).is(':checked')) {
            $("#other_value").css("display", "block");
        } else {
            $("#other_value").css("display", "none");
        }
    });


    $("#other_part_status").change(function() {
        if($(this).is(':checked')) {
            $("#other_value_part_status").css("display", "block");
        } else {
            $("#other_value_part_status").css("display", "none");
        }
    });

    $("#other_measuring").change(function() {
        if($(this).is(':checked')) {
            $("#other_value_measuring").css("display", "block");
        } else {
            $("#other_value_measuring").css("display", "none");
        }
    });

    $("#other_testing").change(function() {
        if($(this).is(':checked')) {
            $("#other_value_testing").css("display", "block");
        } else {
            $("#other_value_testing").css("display", "none");
        }
    });

    $('#time_receiving').clockpicker({
        placement: 'top',
        align: 'top',
        autoclose: true
    });

    $('#simple-date2 .input-group-sm.date').datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true        
    });

    $('#testing_start .input-group-sm.date').datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true        
    });

    $('#time_testing_start').clockpicker({
        placement: 'top',
        align: 'top',
        autoclose: true
    });

    $('#testing_end .input-group-sm.date').datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true        
    });


    $('#time_end').clockpicker({
        placement: 'top',
        align: 'top',
        autoclose: true
    });
});