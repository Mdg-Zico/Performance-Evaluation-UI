$(document).ready(function() {
    setupForm();

    $('#submit-btn').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        handleSubmit();
    });
});

function setupForm() {
    disableFirstFourFields();
}

function disableFirstFourFields() {
    $('#first-name, #last-name, #staff-id, #department').prop('disabled', true);
}

function handleSubmit() {
    if (!validateFields()) {
        alert('Please fill all required fields correctly.');
        return;
    }

    // Show spinner
    $('#spinner').show();

    // Serialize form data
    var formData = $('.form').serialize();

    // Send AJAX request
    $.ajax({
        type: 'POST',
        url: 'your_form_processing_script.php', // Replace with your form processing script URL
        data: formData,
        success: function(response) {
            // Hide spinner on successful response
            $('#spinner').hide();
            // Show success message
            showSubmissionAlert($('.container-fluid'));
            // Scroll to the top immediately
            $('html, body').scrollTop(0);
        },
        error: function(xhr, status, error) {
            // Hide spinner on error response
            $('#spinner').hide();
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
            console.error(xhr.responseText);
        }
    });
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

    // Date validation
    var startDateInput = $('#start-date');
    var endDateInput = $('#end-date');
    var startDateValue = startDateInput.val().trim();
    var endDateValue = endDateInput.val().trim();
    
    if (!startDateValue || !endDateValue) {
        if (!startDateValue) {
            startDateInput.css('borderColor', 'red');
        }
        if (!endDateValue) {
            endDateInput.css('borderColor', 'red');
        }
        isValid = false;
    } else {
        var startDate = new Date(startDateValue);
        var endDate = new Date(endDateValue);
        if (startDate > endDate) {
            startDateInput.css('borderColor', 'red');
            endDateInput.css('borderColor', 'red');
            alert('End Date cannot be earlier than Start Date.');
            startDateInput.val(''); // Clear start date input
            endDateInput.val(''); // Clear end date input
            isValid = false;
        } else {
            startDateInput.css('borderColor', ''); // Reset border color
            endDateInput.css('borderColor', ''); // Reset border color
        }
    }

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
