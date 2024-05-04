document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    disableFormFields();

    document.getElementById('submit-btn').addEventListener('click', function() {
        const formContainer = document.querySelector('.container-fluid');
        const requiredFields = document.querySelectorAll('.form input[required], .form select[required]');
        let isValid = true;

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            alert('Please fill all required fields.');
            return;
        }

        const spinner = document.getElementById('spinner');
        this.disabled = true; // Disable submit button
        spinner.style.display = 'block'; // Show spinner

        setTimeout(function() {
            spinner.style.display = 'none'; // Hide spinner
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

            formContainer.insertBefore(alertDiv, formContainer.firstChild); // Insert alert at the top of the container

            // Handle closing of the alert
            const closeButton = alertDiv.querySelector('.close');
            closeButton.addEventListener('click', function() {
                alertDiv.remove();
            });

            saveFormData();
            disableFormFields();
            document.getElementById('submit-btn').disabled = false; // Re-enable submit button
        }, 2000); // Simulate a delay for the "submission" process
    });

    document.getElementById('update-btn').addEventListener('click', function() {
        document.querySelectorAll('.form input, .form select').forEach(function(input) {
            input.disabled = false;
        });
    });
});

function saveFormData() {
    const inputs = document.querySelectorAll('.form input, .form select');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });
}

function loadFormData() {
    const inputs = document.querySelectorAll('.form input, .form select');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    });
}

function disableFormFields() {
    document.querySelectorAll('.form input, .form select').forEach(function(input) {
        input.disabled = true;
    });
}
