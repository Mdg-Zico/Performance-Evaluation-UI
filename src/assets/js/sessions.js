$(document).ready(function() {
    $('#zero_config').DataTable(); // Initialize the DataTable
    $('#create-session-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        if (!validateSessionFields()) {
            alert('Please fill all required fields correctly.');
        }
    
        $('#spinner').show(); // Show spinner
            // Prepare form data as JSON object
        var formData = {
            session: $('#session').val(),
            startDate: $('#start-date').val(),
            endDate: $('#end-date').val()
            // Add more fields as needed
        };

        sendSessionData(formData);
        

       
    });
});


function sendSessionData(data) {
    console.log(data)
    console.log("strngify",JSON.stringify(data))
    // Send an AJAX request with JSON data
    $.ajax({
        type: 'POST',
        url: 'https://dummy.restapiexample.com/api/v1/create', // Specify your server-side script URL here
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            $('#spinner').hide(); // Hide spinner after operation completion
            showSessionSubmissionAlert($('.container-fluid')); // Show success message
            $('html, body').scrollTop(0); // Scroll to the top of the page
            appendRowToDataTable(data.session, data.startDate, data.endDate);
            console.log(response)
            
        },
        error: function(xhr, status, error) {
            $('#spinner').hide(); // Hide spinner on error
           // console.error(xhr.responseText); // Log error message
            // alert the error if any error occured
          //  console.log("RESPONSE HERE", response)
           // alert(response["responseJSON"]["statusMsg"]);

           showSessionSubmissionFailureAlert($('.container-fluid'))
            $('html, body').scrollTop(0); // Scroll to the top of the page
           
        }
    });
}

function validateSessionFields() {
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
    validateSessionFields();
});

function showSessionSubmissionAlert($container, statusMsg) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Your Form has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}

function showSessionSubmissionFailureAlert($container) {
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

function appendRowToDataTable(session, startDate, endDate) {
    const table = $('#zero_config').DataTable(); // Assuming DataTable is initialized with ID 'zero_config'
   

    // Create a new table row as an array of column data
    const newRow = [
        session,
        startDate,
        endDate,
        '<button class="btn btn-primary btn-update">Update</button> <button class="btn btn-delete">Delete</button>',
        ''
    ];

    // Add the new row to the DataTable and redraw
    table.row.add(newRow).draw(false);

    // Reorder the DataTable to ensure the new row is at the top
    table.order([0, 'desc']).draw();
}