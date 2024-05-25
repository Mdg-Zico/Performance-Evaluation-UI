$(document).ready(
  function () {
  // Global variable declarations
  let total = 0;
  let formsList = [$('div.goal_1'), $('div.goal_2'), $('div.goal_3')];
  "use strict";
  
  // Logic to handle showing saved goals on form Start
  // ajax request

  
  // Logic to handle showing saved goals on form End

  // Form Repeater Start
  const myRepeater = $('#createGoalForm').repeater({
    initEmpty: false,
    show: function () {
      $(this).slideDown();
      formsList.push($(this));
      $(this).removeClass('goal_1');
      $(this).addClass('d-none goal_'+formsList.length);
      $('#submit').addClass('invisible');
      appendtoNav();
    },
    hide: function (deleteElement) {
      // const classList = $(this).attr("class").split(" ");
      // const goalNumber = classList[classList.length - 1];
      // const formIndex = goalNumber.split("_")[1] - 1;
      const formIndex = getGoalNumber($(this)) - 1;
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
    const navbar = $('#goalFormNavigation');
    navbar.append('<li class="nav-item goal_'+navLength+'" style="cursor: pointer;"><span class="nav-link">Goal '+navLength+'</span></li>')
  };

  function popFromNav(goal) {
    const goalNumber = getGoalNumberInClass(goal);
    $('li.'+goalNumber).remove();
  };

  $('#goalFormNavigation').on('click', '.nav-item', function () {
    const [goalNumber, classList] = getGoalNumberInClass($(this));
    console.log(classList);

    if (!classList.includes('active_link')) {
      $('.nav-item.active_link').removeClass('active_link');
      formsList.map(item => {
        if (!item.hasClass('d-none') && !item.hasClass(goalNumber)) {
          item.addClass('d-none');
        }
        if (item.hasClass(goalNumber) && item.hasClass('d-none')) {
          item.removeClass('d-none');
        }
      })
      $(this).addClass('active_link');

      if (formsList[formsList.length - 1].hasClass(goalNumber)) $('#submit').removeClass('invisible');
      else $('#submit').addClass('invisible');
    }
  })
  // Form Navigation End

  // Code to handle Total Weight Start
  $('#createGoalForm').on('input', '#weight', function () {
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
    const objectData = $(this).repeaterVal();
    console.log(objectData.goalsList);
    const data = objectData.goalsList;
    for (let i = 0; i < data.length; i++) {
      data[i]['balanced_scorecard'] = formsList[i].find('#scorecards').val();
      data[i]['weight'] = formsList[i].find('#weight').val();
      data[i]['timeline'] = formsList[i].find('#timeline').val();
    }
    const dataToSend = JSON.stringify(objectData);
    console.log(dataToSend);
    submitGoals(dataToSend)
  });

  function submitGoals(goals) {
    $.ajax({
      type: 'POST',
      url: 'https://dummy.restapiexample.com/api/v1/create',
      data: {
        goals
      },
      success: function (data) {
        console.log(goals);
        console.log(data);
        $('#goalSubmissionAlert').append(
          `<div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
          Form has been submitted successfully!
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      },
      error: function (message) {
        $('#goalSubmissionAlert').append(
          `<div class="alert alert-error alert-dismissible fade show mt-4" role="alert">
          Form has did not submit successfully!
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      }
    });
  }
  // Code to handle submission logic End

  // Code to handle save logic Start
  $('#save-goal-form').on('click', function () {
    const form = $('#createGoalForm');
    const objectData = form.repeaterVal();
    console.log(objectData.goalsList);
    const data = objectData.goalsList;
    for (let i = 0; i < data.length; i++) {
      data[i]['balanced_scorecard'] = formsList[i].find('#scorecards').val();
      data[i]['weight'] = formsList[i].find('#weight').val();
      data[i]['timeline'] = formsList[i].find('#timeline').val();
    }
    const dataToSend = formatJSON(data);
    saveGoals(dataToSend);
  });

  function formatJSON (dataToTransform) {
    const defaultJSON = {"goal_description": [],
    "specific_task": [],
    "agreed_target": [],
    "kpi": [],
    "corporate_objective": [],
    "balanced_scorecard": [],
    "weight": [],
    "timeline": []
    }
    for (let goal of dataToTransform) {
      const goalKeys = Object.keys(goal);
      for (let key of goalKeys) {
        defaultJSON[key].push(goal[key]);
      }
    }
    return defaultJSON;
  }

  function saveGoals (goals) {
    $.ajax({
      type: 'POST',
      url: 'https://dummy.restapiexample.com/api/v1/create',
      data: goals,
      dataType: "json",
      success: function (data) {
        console.log(goals);
        console.log(data);
        // console.log(data);
        $('#goalSaveAlert').append(
          `<div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
          Form has been saved successfully!
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      },
      error: function (message) {
        $('#goalSaveAlert').append(
          `<div class="alert alert-error alert-dismissible fade show mt-4" role="alert">
          Form has did not save successfully!
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      }
    });
  }
  // Code to handle save logic Start

  // Function to get goal number from goal class
  function getGoalNumber(goal) {
    const classList = (goal.attr("class").split(" "));
    const goalNumber = (classList[classList.length - 1].split("_"))[1];
    return (Number(goalNumber));
  }

  // Function to get goal class identifier
  function getGoalNumberInClass(goal) {
    const classList = $(goal).attr("class").split(" ");
    const goalNumber = classList[classList.length - 1];

    return ([goalNumber, classList]);
  }
});
