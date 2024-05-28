$(document).ready(function() {
    // Populate form fields dropdowns
    disableFirstFourFields();

    $("#first-name").html();
    $("#last-name").html();
    $("#middle-name").html();
    $("#email").html();
    $("#staff-id").html();
    $("#department").html();
    $("#unit").html();
    $("#directorate").html();
    $("#designation").html();
    $("#job-level").html();
    $("#line-manager").html();
    $("#reviewer").html();

    const regionSelect = $("#region");
    const areaOfficeSelect = $("#area-office");

    const areaOffices = {
        north: ['North Office 1', 'North Office 2', 'North Office 3'],
        south: ['South Office 1', 'South Office 2', 'South Office 3'],
        east: ['East Office 1', 'East Office 2', 'East Office 3'],
        west: ['West Office 1', 'West Office 2', 'West Office 3']
    };

    const offices = [
        {'name': 'Maitama', 'region': 'FCT Central'},

        {'name': 'Apo', 'region': 'FCT North'},
        {'name': 'Abe', 'region': 'FCT North'},
        {'name': 'cat', 'region': 'FCT North'},
        {'name': 'dof', 'region': 'FCT North'},
        {'name': 'eat', 'region': 'FCT North'},
        {'name': 'ear', 'region': 'FCT North'},
        {'name': 'rice', 'region': 'FCT North'},
    ]

    const regions = ['north', 'south', 'east', 'west'];
    regions.forEach(region => {
        regionSelect.append(`<option value="${region}">${region.charAt(0).toUpperCase() + region.slice(1)}</option>`);
    });

    regionSelect.change(function() {
        const selectedRegion = regionSelect.val();
        // Clear previous area offices
        areaOfficeSelect.html('<option class="default" value="">--Select Area Office--</option>');
        // if (selectedRegion && areaOffices[selectedRegion]) {
        //     areaOffices[selectedRegion].forEach(function(office) {
        //         areaOfficeSelect.append(`<option value="${office}">${office}</option>`);
        //     });
        // }
        if (selectedRegion) {
            areaOfficeSelect.forEach( function (offices) {

                // filter the office list for elements whose region are equal to the selected region
               areaOfficeSelect.append(`<option value="${office}">${office}</option>`)

            }
        )
        }
    });

    $.ajax({
        url: 'https://swapi.dev/api/planets/1/',
        type: "GET",
        dataType: "json",
        success: function(result) {
            console.log(result);
            $.each(result.films, function(key, value) {
                $("#unit").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function(key, value) {
                $("#directorate").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function(key, value) {
                $("#job-level").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function(key, value) {
                $("#line-manager").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function(key, value) {
                $("#reviewer").append("<option>" + value + "</option>");
            });
        },
        error: function() {
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
        }
    });























    
    // handle form submission
    $('#create-profile-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action
    
        if (!validateProfileFields()) {
            alert('Please fill all required fields correctly.');
            return;
        }
        // Show spinner
        $('#spinner').show();
        var formData = {
            first_name: $('#first-name').val(),
            middle_name: $('#middle-name').val(),
            last_name: $('#last-name').val(),
            email: $('#email').val(),
            staff_id: $('#staff-id').val(),
            department: $('#department').val(),
            unit: $('#unit').val(),
            directorate: $('#directorate').val(),
            region: $('#region').val(),
            area_office: $('#area-office').val(),
            designation: $('#designation').val(),
            job_level: $('#job-level').val(),
            line_manager: $('#line-manager').val(),
            reviewer: $('#reviewer').val()
        };
        sendProfileData(formData);
    });
});

function sendProfileData(data) {
    console.log(data)
    $.ajax({
        type: 'POST',
        url: 'https://dummy.restapiexample.com/api/v1/create', // Replace with your form processing script URL
        data: JSON.stringify(data),
        success: function(response) {
            // Hide spinner on successful response
            $('#spinner').hide();
            // Show success message
            showProfileSubmissionAlert($('.container-fluid'));
            // Scroll to the top immediately
            $('html, body').scrollTop(0);
            console.log(response);
        },
        error: function(xhr, status, error) {
            $('#spinner').hide(); // Hide spinner on error
           showProfileSubmissionFailureAlert($('.container-fluid'))
            $('html, body').scrollTop(0); // Scroll to the top of the page
           
        }
    });
}

function disableFirstFourFields() {
    $('#first-name, #last-name, #staff-id, #department, #email').prop('disabled', true);
}

function validateProfileFields() {
    var isValid = true;
    // Validate required fields
    $('#create-profile-form input[required], #create-profile-form select[required]').each(function() {
        if (!$(this).val().trim()) {
            $(this).css('borderColor', 'red');
            isValid = false;
        } else {
            $(this).css('borderColor', ''); // Reset border color if field is filled
        }
    });
    return isValid;
}

function showProfileSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Profile Form submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>' +
        '</button></div>'
    );
    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}
function showProfileSubmissionFailureAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Error on Submission' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}

function setupAlertCloseButton($alertDiv) {
    $alertDiv.find('.close').on('click', function() {
        $alertDiv.remove(); // Close the alert when clicked
    });
}

// Handle Search Dropdown Functionality
$('#line-manager').on('input', function () {
    if (($(this).val()).length >= 3 && ($(this).val()).length <= 5)
    {
        getDropDownData();
    }
})

$('.search-dropdown').on('click', 'li', function () {
    $('#line-manager').val($(this).text());
    $('.search-dropdown').addClass('d-none');
})

$('#search-dropdown').on('mouseout', 'ul', function () {
    $('.search-dropdown').addClass('d-none');
})

$('#search-dropdown').on('mouseenter', 'ul', function () {
    if (($('#line-manager').val()).length >= 3) {
        $('.search-dropdown').removeClass('d-none');
    }
})


function getDropDownData() {
    $.ajax({
        type: 'GET',
        url: 'https://swapi.dev/api/people',
        success: function (data) {
            console.log(data.results);
            for (character of data.results) {
                $('.search-dropdown').append('<li>'+character.name+'</li>')
            }
            $('.search-dropdown').removeClass('d-none');
        },
        error: function (message) {
            console.log(message);
        }
    });
}
