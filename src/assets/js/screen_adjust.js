// Function to adjust form layout based on screen width
function adjustFormLayout() {
    var screenWidth = $(window).width();
    var formContainer = $('.form-container');
    var formGroups = $('.form-group');

    if (screenWidth <= 600) {
        formContainer.css({
            display: 'flex',
            flexWrap: 'wrap'
        });

        formGroups.css({
            flex: '1 1 calc(50% - 10px)',
            marginRight: '10px',
            marginBottom: '10px'
        });

        // Remove margin-right for the last form group
        formGroups.last().css('marginRight', '0');

        // Set label to display block and adjust margin-bottom
        $('.form-group label').css({
            display: 'block',
            marginBottom: '5px'
        });

        // Set input fields and select elements to full width
        $('.form-group input, .form-group select').css('width', '100%');
    } else {
        // Reset styles for smaller screen widths
        formContainer.css({
            display: '',
            flexWrap: ''
        });

        formGroups.css({
            flex: '',
            marginRight: '',
            marginBottom: ''
        });

        $('.form-group label').css({
            display: '',
            marginBottom: ''
        });

        $('.form-group input, .form-group select').css('width', '');
    }
}

// Call the function initially and listen for window resize events
adjustFormLayout();
$(window).resize(adjustFormLayout);
