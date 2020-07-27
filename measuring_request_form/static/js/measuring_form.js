$(document).ready(function () {
    
    $('#dataParts').DataTable();
    $("#dataMaterials").DataTable();

    $('#qty_of_cavity').TouchSpin({
        min: 0,
        max: 100,                
        boostat: 5,
        maxboostedstep: 10,        
        initval: 0
    });

    $('#qty_of_part').TouchSpin({
        postfix: "/ Cavity",
        min: 0,
        max: 100,                
        boostat: 5,
        maxboostedstep: 10,        
        initval: 0
    });

    $("#supplier_search").css("display", "none");
    $("#supplier_form").css("display", "none");
    $("#other_value").css("display", "none");
    $("#other_value_part_status").css("display", "none");
    $("#other_value_measuring").css("display", "none");
    $("#other_value_testing").css("display", "none");

    $("#inputTypeForm").change(function(e) {
        let value = $(e.target).val();
        if(value == "1") {
            $("#supplier_search").css("display", "none");
            $("#customer_search").css("display", "block");
            $("#customer_form").css("display", "block");
            $("#supplier_form").css("display", "none");
            $("#modelOrType").css("display", "block");
            
        } else {
            if(value == "2") {
                $("#supplier_search").css("display", "block");
                $("#customer_search").css("display", "none");
                $("#customer_form").css("display", "none");
                $("#supplier_form").css("display", "block");
                $("#modelOrType").css("display", "none");
            }
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

    function complementaryDocuments() {
        const drawing = $("#drawing");
        const testing = $("#testing");
        const supplier_complementary = $("#supplier_complementary");
        const others = $("#others");
        drawing.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Drawing (2D/3D etc)");
            } else {
                $(this).val("");
            }
        });

        testing.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Testing Std (HES/SES/DTS etc.)");
            } else {
                $(this).val("");
            }
        });

        supplier_complementary.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Supplier Data (Measuring/Testing Report)");
            } else {
                $(this).val("");
            }
        });

        others.change(function() {
            if($(this).is(':checked')) {
                $("#other_value").css("display", "block");
            } else {
                $("#other_value").css("display", "none");
            }
        });
    }

    function partStatus() {
        const new_part = $("#new_part");
        const regular_part = $("#regular_part");
        const periodical = $("#periodical");
        const change_material = $("#change_material");
        const other_part_status = $("#other_part_status");
        
        new_part.change(function() {
            if($(this).is(':checked')) {
                $(this).val("New Project / New Part");
            } else {
                $(this).val("");
            }
        });

        regular_part.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Regular Part");
            } else {
                $(this).val("");
            }
        });

        periodical.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Periodical Part");
            } else {
                $(this).val("");
            }
        });

        change_material.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Change Material");
            } else {
                $(this).val("");
            }
        });

        other_part_status.change(function() {
            if($(this).is(':checked')) {
                $("#other_value_part_status").css("display", "block");
            } else {
                $("#other_value_part_status").css("display", "none");
            }
        });
    }

    function measuringRequest() {
        const dimensionsByDrawing = $("#all_dimension");
        const critical_points = $("#critical_points");
        const dimension = $("#dimension");
        const other_measuring = $("#other_measuring");

        dimensionsByDrawing.change(function() {
            if($(this).is(':checked')) {
                $(this).val("All Dimensions by Drawing");
            } else {
                $(this).val("");
            }
        });

        critical_points.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Critical Points Only");
            } else {
                $(this).val("");
            }
        });

        dimension.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Dimension by Request");
            } else {
                $(this).val("");
            }
        });

        other_measuring.change(function() {
            if($(this).is(':checked')) {
                $("#other_value_measuring").css("display", "block");
            } else {
                $("#other_value_measuring").css("display", "none");
            }
        });
    }

    function testingRequest() {
        const salt_spray = $("#salt_spray");
        const cass_test = $("#cass_test");
        const distortion_test = $("#distortion_test");
        const painting_test = $("#painting_test");
        const impact_test = $("#impact_test");
        const tensile_test = $("#tensile_test");
        const hardness_test = $("#hardness_test");
        const bending_test = $("#bending_test");
        const other_testing = $("#other_testing");
        
        salt_spray.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Salt Spray Test");
            } else {
                $(this).val("");
            }
        });

        cass_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Cass Test");
            } else {
                $(this).val("");
            }
        });

        distortion_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Distortion Test");
            } else {
                $(this).val("");
            }
        });

        painting_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Painting Test");
            } else {
                $(this).val("");
            }
        });

        impact_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Impact Test");
            } else {
                $(this).val("");
            }
        });

        tensile_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Tensile Test");
            } else {
                $(this).val("");
            }
        });

        hardness_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Hardness Test");
            } else {
                $(this).val("");
            }
        });
        
        bending_test.change(function() {
            if($(this).is(':checked')) {
                $(this).val("Bending Test");
            } else {
                $(this).val("");
            }
        });

        other_testing.change(function() {
            if($(this).is(':checked')) {
                $("#other_value_testing").css("display", "block");
            } else {
                $("#other_value_testing").css("display", "none");
            }
        });
    }

    complementaryDocuments();
    partStatus();
    measuringRequest();
    testingRequest();
});