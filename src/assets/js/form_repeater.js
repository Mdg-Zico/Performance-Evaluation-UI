$(document).ready(
  function () {
  let formsList = [];
  "use strict";
  $('.repeater').repeater({
    initEmpty: true,
    show: function () {
      $(this).slideDown();
      $(this).addClass('d-none goal_'+$('.repeater').repeaterVal()['group-a'].length);
      formsList.push($(this));
      console.log("This is formsList\n"+formsList);
      appendtoNav();
    },
    hide: function (deleteElement) {
      popFromNav($(this));
      $(this).slideUp(deleteElement);
    },
    isFirstItemUndeletable: true
  })

  function appendtoNav() {
    // console.log($('.repeater').repeaterVal()['group-a'])
    const navLength = Object.keys($('.repeater').repeaterVal()['group-a']).length;
    // console.log(navLength);
    const navbar = $('.nav-tabs');
    navbar.append('<li class="nav-item goal_'+navLength+'" style="cursor: pointer;"><span class="nav-link">Goal '+navLength+'</span></li>')
  };

  function popFromNav(goal) {
    const classList = goal.attr("class").split(" ");
    const goalNumber = classList[classList.length - 1];
    $('li.'+goalNumber).remove();
  };

  $('.nav-tabs').on('click', '.nav-item', function () {
    const classList = $(this).attr("class").split(" ");
    const goalNumber = classList[classList.length - 1];
    // console.log("You have clicked on navtab "+goalNumber);
    // const navTabs = $('nav-tabs').children();
    $('.nav-item.active_link').removeClass('active_link');
    // navTabs.map(item => {
    //   if (!item.hasClass(goalNumber) && item.hasClass('active_link')) {
    //     // console.log(item);
    //     item.removeClass('active_link');
    //   }
    // });
    formsList.map(item => {
      if (!item.hasClass('d-none') && !item.hasClass(goalNumber)) {
        console.log(item);
        item.addClass('d-none');
      }
      if (item.hasClass(goalNumber) && item.hasClass('d-none')) {
        console.log(item);
        item.removeClass('d-none');
      }
    })
    $(this).addClass('active_link');
  })
});
