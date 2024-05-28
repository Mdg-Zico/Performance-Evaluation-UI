$(document).ready(
  function () {
  // Global variable declarations
  let total = 0;
  let formsList = [$('div.goal_1'), $('div.goal_2'), $('div.goal_3')];
  "use strict";
  
  // Logic to handle showing saved goals on form Start
  // const dummyData = {0: {"goal_description":"fhudhjfkj",
  //                    "specific_task":"fmsdifeief",
  //                    "agreed_target":"wfwofjwnfkn",
  //                    "kpi":"nvjfnriunine",
  //                    "corporate_objective":"Focus point 1",
  //                    "balanced_scorecard":"Scorecard 1",
  //                    "weight":"043",
  //                    "timeline":"2024-05-31T12:21"},
  //                    1: {"goal_description":"fhudhjfkj",
  //                    "specific_task":"fmsdifeief",
  //                    "agreed_target":"wfwofjwnfkn",
  //                    "kpi":"nvjfnriunine",
  //                    "corporate_objective":"Focus point 1",
  //                    "balanced_scorecard":"Scorecard 1",
  //                    "weight":"043",
  //                    "timeline":"2024-05-31T12:21"},
  //                    2: {"goal_description":"fhudhjfkj",
  //                    "specific_task":"fmsdifeief",
  //                    "agreed_target":"wfwofjwnfkn",
  //                    "kpi":"nvjfnriunine",
  //                    "corporate_objective":"Focus point 1",
  //                    "balanced_scorecard":"Scorecard 1",
  //                    "weight":"043",
  //                    "timeline":"2024-05-31T12:21"},
  //                    3: {"goal_description":"different",
  //                    "specific_task":"very different",
  //                    "agreed_target":"wfwofjwnfkn",
  //                    "kpi":"nvjfnriunine",
  //                    "corporate_objective":"Focus point 1",
  //                    "balanced_scorecard":"Scorecard 1",
  //                    "weight":"043",
  //                    "timeline":"2024-05-31T12:21"}};
  
  // function populateSavedGoalsOnLoad (data) {
  //   const numberOfSavedGoals = Object.keys(data).length
  //   console.log(numberOfSavedGoals);
  //   if (formsList.length < numberOfSavedGoals) {
  //     for (let number = formsList.length + 1; number <= numberOfSavedGoals; number++) {
  //       console.log('New goal created');
  //       createGoal(number);
  //     }
  //   }
  //   for (let counter = 0; counter < numberOfSavedGoals; counter++) {
  //     const goalForm = formsList[counter];
  //     const goalData = data[counter];
  //     console.log(goalData);
  //     console.log(typeof(goalData));
  //     for (let key of Object.keys(goalData)) {
  //       goalForm.find('[name="'+key+'"]').val(goalData[key]);
  //     }
  //   }
  // }

  // populateSavedGoalsOnLoad(dummyData);

  // Function to handle creation of extra goals in case they have been saved
  function createGoal (number) {
    const goalTemplate = `<div data-repeater-item class="mt-5 d-none goal_`+number+`">
      <div class="container px-0 mx-0">
        <div class="grid column-gap-3 row px-0 mx-0 w-100">
          <div class="col-sm mb-3 mx-0 px-0 w-100">
            <label for="objective" class="form-label">Corporate Objectives (Strategic focus)</label>
            <select class="form-select" name="corporate_objective" id="focusPoints" required>
              <option class="default" value="Focus point 1">Focus point 1</option>
              <option value="Focus point 2">Focus point 2</option>
              <option value="Focus point 3">Focus point 3</option>
              <option value="Focus point 4">Focus point 4</option>
              <option value="Focus point 5">Focus point 5</option>
              <option value="Focus point 6">Focus point 6</option>
            </select>
          </div>
          <div class="col-sm mb-3 mx-0 px-0 w-100">
            <label for="scorecards" class="form-label">Link to balance scorecard<br/><br/></label>
            <select class="form-select" name="balanced_scorecard" id="scorecards" required>
              <option class="default" value="Scorecard 1">Scorecard 1</option>
              <option value="Scorecard 2">Scorecard 2</option>
              <option value="Scorecard 3">Scorecard 3</option>
              <option value="Scorecard 4">Scorecard 4</option>
              <option value="Scorecard 5">Scorecard 5</option>
              <option value="Scorecard 6">Scorecard 6</option>
            </select>
          </div>
        </div>
      </div>
      <div class="grid column-gap-3 row">
        <div class="col-sm w-100 mb-3">
          <label for="goal" class="form-label">Goal</label>
          <textarea class="form-control" name="goal_description" value="" id="exampleInputGoal" aria-describedby="goalHelp" required></textarea>
          <div id="goalHelp" class="form-text">Short text describing your goal</div>
        </div>
        <div class="col-sm w-100 mb-3">
          <label for="task" class="form-label">Specific tasks to be accomplished</label>
          <textarea class="form-control" name="specific_task" value="" id="task" aria-describedby="goaldescHelp" required></textarea>
          <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div>
        </div>
      </div>
      <div class="grid column-gap-3 row">
        <div class="col-sm w-100 mb-3">
          <label for="target" class="form-label">Agreed Target</label>
          <textarea class="form-control" name="agreed_target" value="" id="target" required></textarea>
          <!-- <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div> -->
        </div>
        <div class="col-sm w-100 mb-3">
          <label for="kpi" class="form-label">Achievement Criteria (KPI)</label>
          <textarea class="form-control" name="kpi" value="" id="kpi" required></textarea>
          <div id="goaldescHelp" class="form-text">Highlight the key performance indices of your goal</div>
        </div>
      </div>
      <section class="container-fluid">
        <div class="grid column-gap-3 row">
          <div class="col-sm mb-3 w-100 px-0 mx-0">
            <label for="weight" class="form-label">Weight</label>
            <input type="number" name="weight" value="0" min="0" max="100" class="form-control" id="weight" required/>
          </div>
          <div class="col mb-3 w-100 px-0 mx-0">
            <label for="timeline" class="form-label">Timeline</label>
            <input type="datetime-local" name="timeline" value="" class="form-control" id="timeline" required/>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-around">
          <button data-repeater-delete class="btn btn-danger rounded-pill hstack gap-6" type="button">
            <i class="ti ti-trash fs-5"></i>
            Delete
          </button>
        </div>
      </section>
    </div>`
    const goalsList = $('[data-repeater-list="goalsList"]');
    goalsList.append(goalTemplate);
    formsList.push($('div.goal_'+number));
    appendtoNav();
  } 
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
          <b>Goal data saved successfully!</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      },
      error: function (message) {
        $('#goalSubmissionAlert').append(
          `<div class="alert alert-error alert-dismissible fade show mt-4" role="alert">
          <b>ERROR: Goal data was not submitted. ${error.responseJSON.statusMsg}</b>
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
    const dataToSend = JSON.stringify(formatJSON(data));
    saveGoals(dataToSend);
  });

  function formatJSON (dataToTransform) {
    const defaultJSON = {}
    let key = 0;
    for (let goal of dataToTransform) {
      goalTemplate = {
        goal_description: goal.goal_description,
        specific_task: goal.specific_task,
        agreed_target: goal.agreed_target,
        kpi: goal.kpi,
        corporate_objective: goal.corporate_objective,
        balanced_scorecard: goal.balanced_scorecard,
        weight: goal.weight,
        timeline: goal.timeline
      }
      if (checkForEmptyObject(goalTemplate))
        defaultJSON[key] = goalTemplate;
      key++;
    }
    console.log(defaultJSON);
    return defaultJSON;
  }

  function checkForEmptyObject (goalObject) {
    const objectKeys = Object.keys(goalObject);
    const exceptions = ["weight", "balanced_scorecard", "corporate_objective"];
    for (let key of objectKeys) {
      if (!exceptions.includes(key)) {
        if (goalObject[key]) return true;
      }
    }
    return false;
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
        $('#goalSaveAlert').append(
          `<div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
          <b>Goal data saved successfully! You are yet to submit your goals.</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
      },
      error: function (error) {
        console.log(error)
        $('#goalSaveAlert').append(
          `<div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
          <b>ERROR: Goal data was not saved. ${error.responseJSON.statusMsg}</b>
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
