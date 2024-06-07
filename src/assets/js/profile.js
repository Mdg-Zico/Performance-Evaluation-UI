$(document).ready(function() {
    // Populate form fields dropdowns
    disableFirstFourFields();

    // Clear previous HTML content (though these lines don't do anything significant in your context)
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

    const offices = [
        {'name': 'Maitama', 'region': 'FCT Central'},
        {'name': 'Apo', 'region': 'East'},
        {'name': 'Abe', 'region': 'North'},
        {'name': 'cat', 'region': 'North'},
        {'name': 'dof', 'region': 'North'},
        {'name': 'eat', 'region': 'North'},
        {'name': 'ear', 'region': 'North'},
        {'name': 'rice', 'region': 'North'},
        {'name': 'South Office 1', 'region': 'South'},
        {'name': 'South Office 2', 'region': 'South'},
        {'name': 'South Office 3', 'region': 'South'},
        {'name': 'East Office 1', 'region': 'East'},
        {'name': 'East Office 2', 'region': 'East'},
        {'name': 'East Office 3', 'region': 'East'},
        {'name': 'West Office 1', 'region': 'West'},
        {'name': 'West Office 2', 'region': 'West'},
        {'name': 'West Office 3', 'region': 'West'}
    ];

    const regions = ['north', 'south', 'east', 'west'];
    regions.forEach(region => {
        regionSelect.append(`<option value="${region}">${region.charAt(0).toUpperCase() + region.slice(1)}</option>`);
    });

    regionSelect.change(function() {
        const selectedRegion = regionSelect.val();
        areaOfficeSelect.html('<option class="default" value="">--Select Area Office--</option>');

        if (selectedRegion) {
            // Filter the office list for elements whose region matches the selected region
            const filteredOffices = offices.filter(office => office.region.toLowerCase() === selectedRegion);

            // Append filtered offices to the areaOfficeSelect dropdown
            filteredOffices.forEach(office => {
                areaOfficeSelect.append(`<option value="${office.name}">${office.name}</option>`);
            });
        }
    });

    $.ajax({
        url: 'https://swapi.dev/api/planets/1/',
        type: "GET",
        dataType: "json",
        success: function(result) {
          
            console.log(result);
            if (result.hasOwnProperty('climate')) {
                const existingClimateData = result.climate;
          
                // Define the data you want to append
                const additionalClimateData = {
                    offices: offices
                };
                const combinedClimateData = Object.assign({}, existingClimateData, additionalClimateData);

                // Update the "climate" key in the data object
                result.climate = combinedClimateData;
          
                // Now you can use the combined climate data
                console.log(result.climate); // Shows both existing and appended data
                // ... (process or display the combined climate data)
            }            
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
            $.each(result.climate, function(key, value) {
                $("#area-office").append("<option>" + value.office.name + "</option>");
            });
        },
        error: function() {
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
        }
    });

    // Handle form submission
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
    console.log(data);
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
            $('#create-profile-form button[type="submit"]').hide();
            console.log(response);
        },
        error: function(xhr, status, error) {
            $('#spinner').hide(); // Hide spinner on error
            showProfileSubmissionFailureAlert($('.container-fluid'));
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
// Get all line managers and reviewers
let reviewersDataObject;
getReviewersData(function (data) {
    reviewersDataObject = data;
    console.log(reviewersDataObject);
});

function filterReviewersDropdown(searchString) {
    const dropdownElement = $('.search-dropdown');
    if (dropdownElement.children.length > 0) {
        dropdownElement.empty();
    } 
    const reviewersList = reviewersDataObject['name']
    console.log(reviewersList);
    const filteredReviewersList = reviewersList.filter(
        reviewer => reviewer.includes(searchString) || reviewer.toLowerCase().includes(searchString)
    );
    for (reviewer of filteredReviewersList) {
        dropdownElement.append(`<li>${reviewer}</li>`);
    }
    if (dropdownElement.hasClass('d-none'))
        dropdownElement.removeClass('d-none');
}

$('#line-manager').on('input', function () {
    const input = $(this).val();
    // if (input.length >= 3 && input.length <= 5) {
    filterReviewersDropdown(input);
    // }
});

$('.search-dropdown').on('click', 'li', function () {
    $('#line-manager').val($(this).text());
    $('.search-dropdown').addClass('d-none');
});

$('#search-dropdown').on('mouseenter', 'ul', function () {
    if (($('#line-manager').val()).length >= 3) {
        $('.search-dropdown').removeClass('d-none');
    }
});

// Get line manager and reviewer data
function getReviewersData(callback) {
    $.ajax({
        type: 'GET',
        url: 'https://swapi.dev/api/people',
        success: function (data) {
            // console.log(data.results);
            const reviewersData = {'name': [], 'email': []}
            for (character of data.results) {
                reviewersData['name'].push(character.name);
                reviewersData['email'].push(character.eye_color);
            }
            console.log(reviewersData);
            callback(reviewersData);
        },
        error: function (message) {
            console.log(message);
        }
    });
}
