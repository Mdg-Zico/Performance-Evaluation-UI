document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    disableFormFields(true);

    document.getElementById('submit-btn').addEventListener('click', handleSubmit);
    document.getElementById('update-btn').addEventListener('click', function() {
        disableFormFields(false);
    });
});

function loadFormData() {
    const inputs = document.querySelectorAll('.form input, .form select');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });
}

function disableFormFields(disable) {
    const fields = document.querySelectorAll('.form input, .form select');
    fields.forEach(field => {
        field.disabled = disable;
    });
}

function handleSubmit() {
    const formContainer = document.querySelector('.container-fluid');
    const spinner = document.getElementById('spinner');
    if (!validateFields()) {
        alert('Please fill all required fields.');
        return;
    }

    spinner.style.display = 'block'; // Show spinner
    document.getElementById('submit-btn').disabled = true; // Disable submit button

    setTimeout(() => {
        spinner.style.display = 'none'; // Hide spinner
        showSubmissionAlert(formContainer);
        saveFormData();
        disableFormFields(true);
        document.getElementById('submit-btn').disabled = false; // Re-enable submit button
    }, 2000); // Simulate a delay for the "submission" process
}

function validateFields() {
    const requiredFields = document.querySelectorAll('.form input[required], .form select[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        field.style.borderColor = field.value.trim() ? '' : 'red'; // Highlighting error fields
        if (!field.value.trim()) isValid = false;
    });
    return isValid;
}

function saveFormData() {
    const inputs = document.querySelectorAll('.form input, .form select');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });
}

function showSubmissionAlert(container) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove(); // Remove existing alert if any
    }

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `Your profile has been submitted successfully!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

    container.insertBefore(alertDiv, container.firstChild); // Insert alert at the top of the container
    setupAlertCloseButton(alertDiv);
}

function setupAlertCloseButton(alertDiv) {
    const closeButton = alertDiv.querySelector('.close');
    closeButton.addEventListener('click', function() {
        alertDiv.remove();
    });
}
