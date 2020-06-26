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

    $("#other_value").css("display", "none");
    $("#other_value_part_status").css("display", "none");
    $("#other_value_measuring").css("display", "none");
    $("#other_value_testing").css("display", "none");

    $("#drawing").change(function() {
        if($(this).is(':checked')) {
            if($("#testing").is(':checked')) {
                $("#testing").prop('checked', false);
            }
            if($("#supplier").is(':checked')) {
                $("#supplier").prop('checked', false);
            }
            if($("#others").is(':checked')) {
                $("#others").prop('checked', false);
                $("#other_value").css("display", "none");
            }
        }
    });

    $("#testing").change(function() {
        if($(this).is(':checked')) {
            if($("#drawing").is(':checked')) {
                $("#drawing").prop('checked', false);
            }
            if($("#supplier").is(':checked')) {
                $("#supplier").prop('checked', false);
            }
            if($("#others").is(':checked')) {
                $("#others").prop('checked', false);
                $("#other_value").css("display", "none");
            }
        }
    });

    $("#supplier").change(function() {
        if($(this).is(':checked')) {
            if($("#drawing").is(':checked')) {
                $("#drawing").prop('checked', false);
            }
            if($("#testing").is(':checked')) {
                $("#testing").prop('checked', false);
            }
            if($("#others").is(':checked')) {
                $("#others").prop('checked', false);
                $("#other_value").css("display", "none");
            }
        }
    });

    $("#others").change(function() {
        if($(this).is(':checked')) {
            if($("#drawing").is(':checked')) {
                $("#drawing").prop('checked', false);
            }
            if($("#testing").is(':checked')) {
                $("#testing").prop('checked', false);
            }
            if($("#supplier").is(':checked')) {
                $("#supplier").prop('checked', false);
            }
            $("#other_value").css("display", "block");
        } else {
            $("#other_value").css("display", "none");
        }
    });

    $("#new_part").change(function() {
        if($(this).is(':checked')) {
            if($("#regular_part").is(':checked')) {
                $("#regular_part").prop('checked', false);
            }

            if($("#periodical").is(':checked')) {
                $("#periodical").prop('checked', false);
            }

            if($("#change_material").is(':checked')) {
                $("#change_material").prop('checked', false);
            }

            if($("#other_part_status").is(':checked')) {
                $("#other_part_status").prop('checked', false);
                $("#other_value_part_status").css("display", "none");
            }
        }
    });

    $("#regular_part").change(function() {
        if($(this).is(':checked')) {
            if($("#new_part").is(':checked')) {
                $("#new_part").prop('checked', false);
            }

            if($("#periodical").is(':checked')) {
                $("#periodical").prop('checked', false);
            }

            if($("#change_material").is(':checked')) {
                $("#change_material").prop('checked', false);
            }

            if($("#other_part_status").is(':checked')) {
                $("#other_part_status").prop('checked', false);
                $("#other_value_part_status").css("display", "none");
            }
        }
    });

    $("#periodical").change(function() {
        if($(this).is(':checked')) {
            if($("#new_part").is(':checked')) {
                $("#new_part").prop('checked', false);
            }

            if($("#regular_part").is(':checked')) {
                $("#regular_part").prop('checked', false);
            }

            if($("#change_material").is(':checked')) {
                $("#change_material").prop('checked', false);
            }

            if($("#other_part_status").is(':checked')) {
                $("#other_part_status").prop('checked', false);
                $("#other_value_part_status").css("display", "none");
            }
        }
    });

    $("#change_material").change(function() {
        if($(this).is(':checked')) {
            if($("#new_part").is(':checked')) {
                $("#new_part").prop('checked', false);
            }

            if($("#regular_part").is(':checked')) {
                $("#regular_part").prop('checked', false);
            }

            if($("#periodical").is(':checked')) {
                $("#periodical").prop('checked', false);
            }

            if($("#other_part_status").is(':checked')) {
                $("#other_part_status").prop('checked', false);
                $("#other_value_part_status").css("display", "none");
            }
        }
    });

    $("#other_part_status").change(function() {
        if($(this).is(':checked')) {
            $("#other_value_part_status").css("display", "block");
            if($("#new_part").is(':checked')) {
                $("#new_part").prop('checked', false);
            }

            if($("#regular_part").is(':checked')) {
                $("#regular_part").prop('checked', false);
            }

            if($("#periodical").is(':checked')) {
                $("#periodical").prop('checked', false);
            }

            if($("#change_material").is(':checked')) {
                $("#change_material").prop('checked', false);
            }
        } else {
            $("#other_value_part_status").css("display", "block");
        }
    });
});