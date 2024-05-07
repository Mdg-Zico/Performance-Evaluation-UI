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
    console.log($('.repeater').repeaterVal()['group-a'])
    const navLength = Object.keys($('.repeater').repeaterVal()['group-a']).length;
    console.log(navLength);
    const navbar = $('.nav-tabs');
    navbar.append('<li class="nav-item goal_1" style="cursor: pointer;"><span class="nav-link">Goal '+navLength+'</span></li>')
  }
});