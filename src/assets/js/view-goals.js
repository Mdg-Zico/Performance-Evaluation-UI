$(document).ready(function() {
    // Add click event handler
    $('.card-hover').on('click', function() {
        // Redirect to a URL when the card is clicked
        window.location.href = $(this).find('a').attr('href');
    });
    $("#updateButton").on('click', function() {
        // Redirect to another page
        window.location.href = "create-goals.html";
    });
    
});
