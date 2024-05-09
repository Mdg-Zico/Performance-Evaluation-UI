$(document).ready(function() {
    setupForm();

    $('#submit-btn').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        handleSubmit();
    });
});

function setupForm() {
    if ($('#session1').length) {
        disableFields(false);
    } else {
        disableFirstFourFields();
    }
}

function disableFirstFourFields() {
    $('#first-name, #middle-name, #last-name, #staff-id, #department').prop('disabled', true);
}

function disableFields(disableStaffId) {
    $('#first-name, #middle-name, #last-name').prop('disabled', true);
    if (disableStaffId) {
        $('#staff-id').prop('disabled', true);
    }
}

function handleSubmit() {
    if (!validateFields()) {
        alert('Please fill all required fields.');
        return;
    }

    $('#spinner').show(); // Show spinner

    setTimeout(function() {
        $('#spinner').hide(); // Hide spinner after operation completion
        showSubmissionAlert($('.container-fluid')); // Show success message

        // Scroll to the very top of the page
        $('html, body').scrollTop(0); // Scroll to the top immediately
    }, 2000); // Simulate a 2-second processing delay
}

function validateFields() {
    var isValid = true;
    $('.form input[required], .form select[required]').each(function() {
        if (!$(this).val().trim()) {
            $(this).css('borderColor', 'red');
            isValid = false;
        } else {
            $(this).css('borderColor', ''); // Reset border color
        }
    });
    return isValid;
}

function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Your profile has been submitted successfully!' +
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
