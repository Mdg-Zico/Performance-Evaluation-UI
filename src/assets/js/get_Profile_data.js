/*$(document).ready(function() {
    // Function to populate dropdown
    $.ajax({
        url: '/profile/',
        type: 'GET',
        success: function(data) {
            ('#area-office').empty(); // Clear existing options
            ('#area-office').append('<option value="">-- Select --</option>'); // Add default option
            ('#area-office').append(data['offices'])
            ('#job-level').append(data['job_level'])

            dropdown.append('<option value="">-- Select --</option>'); // Add default option
            $.each(data, function(index, option) {
                dropdown.append('<option value="' + option.value + '">' + option.label + '</option>');
            });
        },
        error: function()
    });
});

*/
