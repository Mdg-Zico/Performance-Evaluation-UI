$(function () {
  "use strict";
  $('.repeater').repeater({
    initEmpty: true,
    show: function () {
      $(this).slideDown();
      $(this).addClass('d-none');
      $(this).addClass('goal_'+$('.repeater').repeaterVal()['group-a'].length);
      appendtoNav();
    },
    hide: function (deleteElement) {
      popFromNav($(this));
      $(this).slideUp(deleteElement);
    },
    isFirstItemUndeletable: true
  })

  function appendtoNav() {
    console.log($('.repeater').repeaterVal()['group-a'])
    const navLength = Object.keys($('.repeater').repeaterVal()['group-a']).length;
    console.log(navLength);
    const navbar = $('.nav-tabs');
    navbar.append('<li class="nav-item goal_'+navLength+'" style="cursor: pointer;"><span class="nav-link">Goal '+navLength+'</span></li>')
  };

  function popFromNav(goal) {
    const classList = goal.attr("class").split(" ");
    const goalNumber = classList[classList.length - 1];
    $('li.'+goalNumber).remove();
  };

  $('li.nav-item').on('click', function () {
    const classList = $(this).attr("class").split(" ");
    const goalNumber = classList[classList.length - 1];
  })
});