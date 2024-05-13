$(document).ready(
  function () {
    $('.nav2').on('click', '.nav-btn', function () {
      if ($(this).hasClass('active-navbtn')) {
        pass;
      } else {
        $('.nav-btn.active-navbtn').removeClass('active-navbtn');
        $(this).addClass('active-navbtn');
      }
    })
  }
)