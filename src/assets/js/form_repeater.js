$(function () {
  "use strict";
  $('.repeater').repeater({
    initEmpty: true,
    show: function () {
      $(this).slideDown();
      appendtoNav();
    },
    hide: function (deleteElement) {
      $(this).slideUp(deleteElement);
    },
    isFirstItemUndeletable: true
  })

  function appendtoNav() {
    navLength = Object.keys($('.repeater').repeaterVal()).length;
    console.log(navLength);
    navbar = $('.nav-tabs');
    navbar.append('<li>Goal</li>')
  }
});