$(document).ready(function() {
    disableFirstFourFields();

    $('#create-profile-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action
    
        if (!validateFields()) {
            alert('Please fill all required fields correctly.');
            return;
        }

        // Show spinner
        $('#spinner').show();

        // Serialize form data
        var serialisedData = $('#create-profile-form').serialize();
        


        var formData = {
            firstName: $('#first-name').val(),
            lastName: $('#last-name').val(),
            middleName: $('#middle-name').val(),
            staffID: $('#staff-id').val(),
            department: $('#department').val(),
            unit: $('#unit').val(),
            directorate: $('#directorate').val(),
            region: $('#region').val(),
            areaOffice: $('#area-office').val(),
            designation: $('#designation').val(),
            jobLevel: $('#job-level').val(),
            lineManager: $('#line-manager').val(),
            reviewer: $('#reviewer').val()
            // Add more fields as needed
        };

        sendProfileData(formData);
    });
});

function sendProfileData(data) {
    console.log(data)
    console.log("strngify",JSON.stringify(data))
    $.ajax({
        type: 'POST',
        url: 'https://dummy.restapiexample.com/api/v1/create', // Replace with your form processing script URL
        data: JSON.stringify(data),
        success: function(response) {
            // Hide spinner on successful response
            $('#spinner').hide();
            // Show success message
            showSubmissionAlert($('.container-fluid'));
            // Scroll to the top immediately
            $('html, body').scrollTop(0);
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Hide spinner on error response
            $('#spinner').hide();
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
        }
    });
}

function disableFirstFourFields() {
    $('#first-name, #last-name, #staff-id, #department').prop('disabled', true);
}

function validateFields() {
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



function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Form has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>' +
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
    if (($(this).val()).length >= 3)
    {
        $('.search-dropdown').removeClass('d-none');
    }
})

$('.search-dropdown li').on('click', function () {
    $('#line-manager').val($(this).text());
    $('.search-dropdown').addClass('d-none');
})