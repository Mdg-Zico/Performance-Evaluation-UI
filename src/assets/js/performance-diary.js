$(document).ready(
  function () {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const date = new Date();
    currentMonth = months[date.getMonth()];
    const navtab = $('.nav-btn').attr()
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