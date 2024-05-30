
$(document).ready(function () {
    $('#zero_config').DataTable(); // Initialize the DataTable
    $("#reason").change(function() {
        if ($(this).val() === "Other") {
          $("#otherReason, #other-reason-label").show();
        } else {
          $("#otherReason, #other-reason-label").hide();
        }
      });
    $('#create-goal-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        if (!validateGoalFields()) {
            alert('Please fill all required fields correctly.');
        }
    
        // Show spinner
        $('#spinner').show();
    
        // Serialize form data
        const formData = {
            goalSession: $('#goal-session').val(),
            goalStaffId: $('#goal-staff-id').val(),
            startDate: $('#start-date').val(),
            endDate: $('#end-date').val(),
            otherReason: $('#otherReason').val()

            // Add more fields as needed
        }
       
        sendGoalData(formData);


});

})

function sendGoalData(data) {
    console.log(data)
    console.log("stringify" + JSON.stringify(data))
    // Send AJAX request
    $.ajax({
        type: 'POST',
        url: 'https://dummy.restapiexample.com/api/v1/create', // Replace with your form processing script URL
        data: JSON.stringify(data),
        
        success: function(response) {
            // Hide spinner on successful response
            $('#spinner').hide();
            // Show success message
            showGoalSubmissionAlert($('.container-fluid'));
            // Scroll to the top immediately
            $('html, body').scrollTop(0);
          
            console.log("Response: " + response)
        },
        error: function(xhr, status, error) {
            $('#spinner').hide(); // Hide spinner on error
           showGoalSubmissionFailureAlert($('.container-fluid'))
            $('html, body').scrollTop(0); // Scroll to the top of the page
           
        }
    });
}



function validateGoalFields() {
    var isValid = true;

    // Validate required fields
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

    if (startDateValue && endDateValue) {
        var startDate = new Date(startDateValue);
        var endDate = new Date(endDateValue);

        if (startDate > endDate) {
            startDateInput.css('borderColor', 'red');
            endDateInput.css('borderColor', 'red');
            alert('End Date cannot be earlier than Start Date.');
            isValid = false;
        } else {
            startDateInput.css('borderColor', ''); // Reset border color
            endDateInput.css('borderColor', ''); // Reset border color
        }
    } else {
        if (!startDateValue) {
            startDateInput.css('borderColor', 'red');
            isValid = false;
        }
        if (!endDateValue) {
            endDateInput.css('borderColor', 'red');
            isValid = false;
        }
    }

    return isValid;
}

// To ensure the border resets immediately when the input changes
$('#start-date, #end-date').on('input', function() {
    validateGoalFields();
});


function showGoalSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        ' Goal Form submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}
function showGoalSubmissionFailureAlert($container) {
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
