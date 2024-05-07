$(document).ready(function() {
    loadFormData();
    disableFormFields(true);

    $('#submit-btn').on('click', handleSubmit);
    $('#update-btn').on('click', function() {
        disableFormFields(false);
    });
});

function loadFormData() {
    $('.form input, .form select').each(function() {
        var savedValue = localStorage.getItem(this.id);
        if (savedValue) {
            $(this).val(savedValue);
        }
    });
}

function disableFormFields(disable) {
    $('.form input, .form select').each(function() {
        $(this).prop('disabled', disable);
    });
}

function handleSubmit() {
    var $spinner = $('#spinner');
    if (!validateFields()) {
        alert('Please fill all required fields.');
        return;
    }

    $spinner.css('display', 'block'); // Show spinner
    $('#submit-btn').prop('disabled', true); // Disable submit button

    setTimeout(function() {
        $spinner.css('display', 'none'); // Hide spinner
        showSubmissionAlert($('.container-fluid'));
        saveFormData();
        disableFormFields(true);
        $('#submit-btn').prop('disabled', false); // Re-enable submit button
    }, 2000); // Simulate a delay for the "submission" process
}

function validateFields() {
    var isValid = true;
    $('.form input[required], .form select[required]').each(function() {
        $(this).css('borderColor', $(this).val().trim() ? '' : 'red'); // Highlighting error fields
        if (!$(this).val().trim()) isValid = false;
    });
    return isValid;
}

function saveFormData() {
    $('.form input, .form select').each(function() {
        localStorage.setItem(this.id, $(this).val());
    });
}

function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Your profile has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Insert alert at the top of the container
    setupAlertCloseButton($alertDiv);
}

function setupAlertCloseButton($alertDiv) {
    $alertDiv.find('.close').on('click', function() {
        $alertDiv.remove();
    });
}
