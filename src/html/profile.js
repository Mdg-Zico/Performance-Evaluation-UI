$(document).ready(function() {
    // Run initial setups
    setupForm();

    $('#submit-btn').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        handleSubmit();
    });
});

function setupForm() {
    // Check for the presence of the session form to determine field behavior
    if ($('#session1').length) {
        // This form requires 'Staff ID' to be enabled
        disableFields(false); // Call with false to not disable staff ID
    } else {
        // Disable the first four fields as this is the default form
        disableFirstFourFields();
    }
}

function disableFirstFourFields() {
    // Disable only the specific fields that are to be populated by the backend
    $('#first-name').prop('disabled', true);
    $('#middle-name').prop('disabled', true);
    $('#last-name').prop('disabled', true);
    $('#staff-id').prop('disabled', true);
}

function disableFields(disableStaffId) {
    $('#first-name, #middle-name, #last-name').prop('disabled', true);
    if (disableStaffId) {
        $('#staff-id').prop('disabled', true);
    }
}

function handleSubmit() {
    if (!validateFields()) {
        alert('Please fill all required fields.'); // Alert if not all required fields are filled
        return;
    }
    // Here you could include any AJAX or form submission logic as needed
    showSubmissionAlert($('.container-fluid')); // Show a success message
}

function validateFields() {
    var isValid = true;
    $('.form input[required], .form select[required]').each(function() {
        if (!$(this).val().trim()) {
            $(this).css('borderColor', 'red'); // Highlighting error fields
            isValid = false;
        } else {
            $(this).css('borderColor', ''); // Reset border color if field is filled
        }
    });
    return isValid;
}

function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove any existing alerts first

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Your profile has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Add the alert at the top of the container
    setupAlertCloseButton($alertDiv); // Setup the close functionality
}

function setupAlertCloseButton($alertDiv) {
    $alertDiv.find('.close').on('click', function() {
        $alertDiv.alert('close'); // Properly close the alert when the close button is clicked
    });
}
