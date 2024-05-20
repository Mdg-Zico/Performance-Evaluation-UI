$(document).ready(
  function () {
  // Global variable declarations
  let total = 0;
  let formsList = [$('div.goal_1'), $('div.goal_2'), $('div.goal_3')];
  "use strict";

  // Form Repeater Start
  $('.repeater').repeater({
    initEmpty: false,
    show: function () {
      $(this).slideDown();
      formsList.push($(this));
      $(this).removeClass('goal_1');
      $(this).addClass('d-none goal_'+formsList.length);
      // console.log("This is formsList\n"+formsList);
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
  // Form Repeater End

  // Form Navigation Start
  function appendtoNav() {
    const navLength = formsList.length;
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
    $('.nav-item.active_link').removeClass('active_link');

    formsList.map(item => {
      if (!item.hasClass('d-none') && !item.hasClass(goalNumber)) {
        // console.log(item);
        console.log("Printing from navigation", item.find('#weight').val());
        item.addClass('d-none');
      }
      if (item.hasClass(goalNumber) && item.hasClass('d-none')) {
        // console.log(item);
        item.removeClass('d-none');
      }
    })
    $(this).addClass('active_link');
  })
  // Form Navigation End

  // Code to handle Total Weight Start
  $('form').on('input', '#weight', function () {
    total -= total;
    if ($(this).val() > 100) {
      $(this).val(0);
      alert("Maximum Weight cannot exceed 100");
    };

    formsList.map(elem => {
      elemWeight = elem.find("#weight");
      newWeight = Number(elemWeight.val());
      if ((total + newWeight) <= 100) {
        total += newWeight;
      } else {
        alert("Total weight must not exceed 100");
        elemWeight.val(0);
      }
    });
    const totalWeightElement = $('#totalWeight h5')
    totalWeightElement.text('Total Weight: ' + total + '/100');
  });
  // Code to handle Total Weight End
  
  // Code to handle submission logic Start
  $('#createGoalForm').on('submit', function () {
    event.preventDefault();
    if (total != 100) {
      alert("Total Weight MUST be equal to 100");
      return;
    }
    serialize = $(this).serialize();
    console.log(data);
    console.log(serialize);
  });
  // Code to handle submission logic End
});
