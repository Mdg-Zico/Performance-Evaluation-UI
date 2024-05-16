$(document).ready(
  function () {
  // Form Repeater
  let formsList = [$('div.goal_1'), $('div.goal_2'), $('div.goal_3')];
  "use strict";
  $('.repeater').repeater({
    initEmpty: false,
    show: function () {
      $(this).slideDown();
      formsList.push($(this));
      $(this).removeClass('goal_1');
      $(this).addClass('d-none goal_'+formsList.length);
      console.log("This is formsList\n"+formsList);
      appendtoNav();
    },
    hide: function (deleteElement) {
      const classList = $(this).attr("class").split(" ");
      const goalNumber = classList[classList.length - 1];
      const formIndex = goalNumber.split("_")[1] - 1;
      $('li.goal_'+formIndex).addClass('active_link');
      formsList[formIndex - 1].removeClass('d-none');
      popFromNav($(this));
      $(this).fadeOut(deleteElement);
    },
    isFirstItemUndeletable: true
  })

  function appendtoNav() {
    // console.log($('.repeater').repeaterVal()['group-a'])
    const navLength = formsList.length;
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
    console.log("You have clicked on navtab "+goalNumber);
    // console.log(classList);
    // const navTabs = $('nav-tabs').children();
    $('.nav-item.active_link').removeClass('active_link');

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
  // Form Repeater End

  // Dynamic Change of scorecard value on dropdown selection
  // $('select').on('change', function () {
  //   console.log("Dropdown option changed");
  //   const scorecard = $('#scorecards')
  //   console.log(scorecard.attr('value'));
  //   console.log($(this).attr('value'));
    
  // });

  $('#createGoalForm').on('submit', function () {
    event.preventDefault();
    data = $('.repeater').repeaterVal();
    serialize = $(this).serialize();
    // data_display = JSON.stringify(data);
    console.log(data);
    console.log(serialize);
  });
});
