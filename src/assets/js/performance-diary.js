$(document).ready(
  function () {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const date = new Date();
    currentMonth = months[date.getMonth()];
    console.log(currentMonth);
    const navtab = $('[name="'+currentMonth+'"]');
    navtab.addClass('active-navbtn');
    console.log(navtab);
    $('.nav2').on('click', '.nav-btn', function () {
      if ($(this).hasClass('active-navbtn')) {
        pass;

      } else {
        $('.nav-btn.active-navbtn').removeClass('active-navbtn');
        console.log("Clicked nav element"+$(this).attr('name'));
        $(this).addClass('active-navbtn');
        getPerformanceScores();
      }
    })
  }
)

function getPerformanceScores(){
  $ajax({
    // get scores from backend
  })
}

function displayGoalsAndPerformanceScores(response) {

}