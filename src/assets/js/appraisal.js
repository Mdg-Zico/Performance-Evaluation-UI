$(document).ready(
  function () {
  // Global variable declarations
  let total = 0;
  let dependentDropdownData;
  let formsList = [$('div.goal_1'), $('div.goal_2'), $('div.goal_3')];
  "use strict";


  // Logic to handle showing saved goals on form Start
  // $.ajax({
  //   url: '/get_goals/',
  //   type: "GET",
  //   dataType: "json",
  //   success: function (data) {
  //     console.log(data);
  //     // console.log(dummyData)
  //     console.log("json", data);
    
  //     populateSavedGoalsOnLoad(data);
  //   },
  //   error: function (error) {
  //     console.log("ERROR", error);
  //   }
  // });

  // Logic to pull corporate objectives
  // $.ajax({
  //   url: '/corporate_objectives/',
  //   type: "GET",
  //   dataType: "json",
  //   success: function (res) {
  //     const data1 = pairValuesOfObjectivesAndScorecards(JSON.parse(res))
  //     data = data1
  //     console.log("paired values", data)
  //     populateDropDown(data1, formsList);
  //   },
  //   error: function (error) {
  //     console.log(error);
  //   }
  // })

  // Dummy Data
  const dummyData = {
    "0":{
         "goal_description":"for goal 1",
         "specific_task":"task goal 1",
         "agreed_target":"dknednie",
         "kpi":"ejd ececeic",
         "corporate_objective":"Luke Skywalker",
         "balanced_scorecard":"blue",
         "weight":"3",
         "timeline":"2024-06-01T08:32"
        },
    "1":{
      "goal_description":"for goal 2",
      "specific_task":"task goal 2",
      "agreed_target":"dknednie",
      "kpi":"ejd ececeic",
      "corporate_objective":"C-3PO",
      "balanced_scorecard":"yellow",
      "weight":"43",
      "timeline":"2024-06-01T08:32"
      },
    "2":{
    "goal_description":"hdyygdi",
    "specific_task":"dreedw",
    "agreed_target":"dknednie",
    "kpi":"ejd ececeic",
    "corporate_objective":"Darth Vader",
    "balanced_scorecard":"yellow",
    "weight":"32",
    "timeline":"2024-06-01T08:32"
    },
    "3":{
    "goal_description":"hdyygdi",
    "specific_task":"dreedw",
    "agreed_target":"dknednie",
    "kpi":"ejd ececeic",
    "corporate_objective":"Owen Lars",
    "balanced_scorecard":"blue",
    "weight":"22",
    "timeline":"2024-06-01T08:32"
    }
  }
  // Dummy logic to test dependent dropdown REMOVE THIS
  function getCorporateObjectives(callback) {
    $.ajax({
        type: 'GET',
        url: 'https://swapi.dev/api/people',
        success: function (data) {
            // console.log(data.results);
            const corporate_objectives = {}
            for (character of data.results) {
                corporate_objectives[character.name] = character.eye_color;
            }
            // console.log(corporate_objectives);
            callback(corporate_objectives);
        },
        error: function (message) {
            console.log(message);
        }
    });
  }

  // REMOVE THIS
  let corporate_objectives;
  getCorporateObjectives(
    function (data) {
      corporate_objectives = data;
      dependentDropdownData = corporate_objectives;
      populateDropDown(data, formsList);
      // console.log(Object.keys(dependentDropdownData));
      // populateSavedGoalsOnLoad(dummyData);
    }
  )
  // Logic to handle dependent dropdowns
  function handleDependentDropdown (goal_element) {
    goal_element.on('change', '.form-select', function () {
      const balanced_scorecard = ($(this).parent()).parent().find('#balanced_scorecard');
      const key = $(this).val();
      console.log("BALANCED SCORECARD ELEMENT", balanced_scorecard);
      console.log("KEY", key);
      console.log("VALUE", dependentDropdownData[key]);
      balanced_scorecard.val(dependentDropdownData[key]);
    });
  }

  handleDependentDropdown($('.goal'));
      
  
  function pairValuesOfObjectivesAndScorecards(json) {
    let newDropDown = {};
    for (let item of json) {
      let objective = item['objective'];
      newDropDown[objective] = item['link_to_balance_scorecard'];
    }
    return newDropDown;
  }

  function populateDropDown(data, goalsList) {
    console.log("Goals list", goalsList);
    for (let goal of goalsList) {
      // console.log(goal);
      const dropdown = goal.find('#appraisee-rating');
      // console.log("dropdown val", dropdown)
      const dropdownChildrenLength = dropdown.children().length;
      // console.log(dropdownChildrenLength);
      if (dropdownChildrenLength < 2) {
        dropdown.html()
        if (dropdownChildrenLength == 0) {
          dropdown.append(`<option value="" disabled selected>-- Select corporate objective --</option>`);
        }
        $.each(data, function (key, value) {
          if (key != dropdown.val())
            dropdown.append(`<option value="${key}" class="dependent-dropdown">` + key + `</option>`);
        });
      }
    }
  }

  
  // dropdown.on('change', function() {
  //   $('#balanced_scorecard').val()
  // })
  
  // Function to make timeline input more readable
  function formatDatetime(dtStr) {
    // Parse the datetime string
    var dt = new Date(dtStr);

    // Define month names
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format the date components
    var month = monthNames[dt.getMonth()];
    var day = dt.getDate();
    var year = dt.getFullYear();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine the formatted components into the final string
    // var formattedDate = month + " " + day + " " + year + " " + hours + ":" + minutes + " " + ampm;
    var formattedDate = `${month} ${day}, ${year}. ${hours}:${minutes} ${ampm}`;

    return formattedDate;
  }
  // Function end

  function populateSavedGoalsOnLoad (data) {
    const numberOfSavedGoals = Object.keys(data).length
    console.log("num saved",numberOfSavedGoals);
    // if (formsList.length < numberOfSavedGoals) {
    //   for (let number = formsList.length + 1; number <= numberOfSavedGoals; number++) {
    //     console.log('New goal created');
    //     createGoal(number);
    //   }
    // }
    for (let counter = 0; counter < numberOfSavedGoals; counter++) {
      const goalData = data[counter];
      if (counter < 3) {
        const goalForm = formsList[counter];
        // console.log(goalForm);
        for (let key of Object.keys(goalData)) {
          if (key == 'timeline') {
            let goal = goalForm.find(`[id=${key}]`);
            // console.log(goal);
            goal.val(goalData[key]);
          }
          else if (key == 'corporate_objective') {
            let goal = goalForm.find(`[id = "${key}"]`)
            console.log(goal);
            goal.append(`<option value="${goalData[key]}" class="dependent-dropdown" selected>${goalData[key]}</option>`);
          }
          else {
            let goal = goalForm.find('[id="'+key+'"]');
            // console.log(goal);
            goal.val(goalData[key]);
          }
        }
      } else {
        createGoal(counter + 1, goalData);
      }
    }
    // console.log(formsList);
    populateDropDown(dependentDropdownData, formsList);
    handleTotalWeight();
    // console.log("Dependent dropdown data", dependentDropdownData);
  }

  // Function to handle creation of extra goals in case they have been saved
  function createGoal (number, goal) {
    const goalTemplate = `<div data-repeater-item class="mt-5 d-none goal goal_${number}">
      <div class="container px-0 mx-0">
        <div class="grid column-gap-3 row">
          <div class="col-sm mb-3 mx-0">
            <label for="objective" class="form-label">Corporate Objectives (Strategic focus)</label>
            <select class="form-select" name="corporate_objective" id="corporate_objective" required>
              <option value="${goal.corporate_objective}" class="dependent-dropdown" selected>${goal.corporate_objective}</option>
            </select>
          </div>
          <div class="col-sm mb-3 mx-0">
            <label for="scorecards" class="form-label">Link to balance scorecard</label>
            <input class="form-control" value="${goal.balanced_scorecard}" name="balanced_scorecard" id="balanced_scorecard" readonly/>
          </div>
        </div>
      </div>
      <div class="grid column-gap-3 row">
        <div class="col-sm w-100 mb-3">
          <label for="goal" class="form-label">Goal</label>
          <textarea class="form-control" name="goal_description" value="${goal.goal_description}" id="goal_description" aria-describedby="goalHelp" required>${goal.goal_description}</textarea>
          <div id="goalHelp" class="form-text">Short text describing your goal</div>
        </div>
        <div class="col-sm w-100 mb-3">
          <label for="task" class="form-label">Specific tasks to be accomplished</label>
          <textarea class="form-control" name="specific_task" value="${goal.specific_task}" id="specific_task" aria-describedby="goaldescHelp" required>${goal.specific_task}</textarea>
          <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div>
        </div>
      </div>
      <div class="grid column-gap-3 row">
        <div class="col-sm w-100 mb-3">
          <label for="target" class="form-label">Agreed Target</label>
          <textarea class="form-control" name="agreed_target" value="${goal.agreed_target}" id="agreed_target" required>${goal.agreed_target}</textarea>
          <!-- <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div> -->
        </div>
        <div class="col-sm w-100 mb-3">
          <label for="kpi" class="form-label">Achievement Criteria (KPI)</label>
          <textarea class="form-control" name="kpi" value="${goal.kpi}" id="kpi" required>${goal.kpi}</textarea>
          <div id="goaldescHelp" class="form-text">Highlight the key performance indices of your goal</div>
        </div>
      </div>
      <section class="container-fluid">
        <div class="grid column-gap-3 row">
          <div class="col-sm mb-3 w-100 px-0 mx-0">
            <label for="weight" class="form-label">Weight</label>
            <input type="number" name="weight" value="${goal.weight}" min="0" max="100" class="form-control" id="weight" required/>
          </div>
          <div class="col mb-3 w-100 px-0 mx-0">
            <label for="timeline" class="form-label">Timeline</label>
            <input type="datetime-local" name="timeline" value="${goal.timeline}" class="form-control" id="timeline" required/>
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
    // const thisGoal = $('div.goal_'+number);
    goalsList.append(goalTemplate);
    formsList.push($('div.goal_'+number));
    handleDependentDropdown($(`div.goal_${number}`));
    appendtoNav();
  } 
  // Logic to handle showing saved goals on form End

  // Form Repeater Start
  const myRepeater = $('#goal-evaluation').repeater({
    initEmpty: false,
    show: function () {
      $(this).slideDown();
      formsList.push($(this));
      $(this).removeClass('goal_1');
      $(this).addClass('d-none goal_'+formsList.length);
      $('#submit').addClass('invisible');
      appendtoNav();
      populateDropDown(dependentDropdownData, formsList);
      handleDependentDropdown($(this));
    },
    hide: function (deleteElement) {
      // const classList = $(this).attr("class").split(" ");
      // const goalNumber = classList[classList.length - 1];
      // const formIndex = goalNumber.split("_")[1] - 1;
      const formIndex = getGoalNumber($(this)) - 1;
      $('li.goal_'+formIndex).addClass('active_link');
      formsList[formIndex - 1].removeClass('d-none');
      formsList.splice(formIndex, 1);
      popFromNav($(this));
      $(this).fadeOut(deleteElement);
      recalibrateCount($(this));
    },
    isFirstItemUndeletable: true
  })
  // Form Repeater End


  // Form Navigation Start
  function appendtoNav() {
    const navLength = formsList.length;
    const navbar = $('#goalFormNavigation');
    navbar.append(
      '<li class="nav-item goal_'
      + navLength
      + '" style="cursor: pointer;"><span class="nav-link">Goal '
      +navLength
      +'</span></li>'
    )
  };

  function popFromNav(goal) {
    const goalNumber = getGoalNumberInClass(goal);
    $('li.'+goalNumber).remove();
  };

  // Recalibrate count of nav and goals
  function recalibrateCount(goal) {
    const goalNumber = getGoalNumber(goal);
    console.log(goalNumber);
    let count = goalNumber - 1;
    do {
      const goalToUpdate = formsList[count];
      const navItemToUpdate = $(`.nav-item.goal_${count + 2}`);
      goalToUpdate.removeClass(`goal_${count + 2}`);
      goalToUpdate.addClass(`goal_${count + 1}`);
      navItemToUpdate.removeClass(`goal_${count + 2}`);
      navItemToUpdate.addClass(`goal_${count + 1}`);
      navItemToUpdate.find('span').text(`Goal ${count + 1}`);
      count++;
    } while (count < formsList.length)
    console.log($('#goalFormNavigation').children());
    // console.log(formsList);
  }

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
  function handleTotalWeight (element) {
    console.log("Total", total);
    formsList.map(elem => {
      elemWeight = elem.find("#weight");
      newWeight = Number(elemWeight.val());
      if ((total + newWeight) <= 100) {
        total += newWeight;
      } else {
        console.log("Total", total);
        alert("Total weight must not exceed 100");
        element.val(0);
      }
    });
    const totalWeightElement = $('#totalWeight h5')
    totalWeightElement.text('Total Weight: ' + total + '/100');
  }

  $('#goal-evaluation').on('input', '#weight', function () {
    total -= total;
    if ($(this).val() > 100) {
      $(this).val(0);
      alert("Maximum Weight cannot exceed 100");
    };
    handleTotalWeight($(this));
  });
  // Code to handle Total Weight End
  
  // Code to handle submission logic Start
  $('#goal-evaluation').on('submit', function () {
    event.preventDefault();
    if (total != 100) {
      $('.alert').remove();
      $('.form-parent').prepend(
        `<div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
        <b>ERROR: Goal data was not submitted. Total weight must be 100</b>
        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
        </button></div>`
      )
      $('html, body').scrollTop(0);
      return;
    }
    const data = {};
    for (let i = 0; i < formsList.length; i++) {
      data[i] = {
        'goal_form_id': i + 1, // j not i
        'balanced_scorecard': formsList[i].find('#balanced_scorecard').val(),
        'corporate_objective': formsList[i].find('#corporate_objective').val(),
        'weight': formsList[i].find('#weight').val(),
        'timeline': formsList[i].find('#timeline').val(),
        'agreed_target': formsList[i].find('#agreed_target').val(),
        'goal_description': formsList[i].find('#goal_description').val(),
        'kpi': formsList[i].find('#kpi').val(),
        'specific_task': formsList[i].find('#specific_task').val()
      }
    }    
    console.log(data);
    submitGoals(data);
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
        $('.alert').remove();
        $('.form-parent').prepend(
          `<div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
          <b>Goal data submit successfully!</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
        $('html, body').scrollTop(0);
      },
      error: function (message) {
        $('.alert').remove();
        $('.form-parent').prepend(
          `<div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
          <b>ERROR: Goal data was not submitted. ${message.responseJSON.statusMsg}</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
        $('html, body').scrollTop(0);
      }
    });
  }
  // Code to handle submission logic End

  // Code to handle save logic Start
  $('#save-goal-form').on('click', function () {
    const data = {};
    for (let i = 0; i < formsList.length; i++) {
      data[i] = {
        'goal_form_id': i + 1, // j not i
        'balanced_scorecard': formsList[i].find('#balanced_scorecard').val(),
        'corporate_objective': formsList[i].find('#corporate_objective').val(),
        'weight': formsList[i].find('#weight').val(),
        'timeline': formsList[i].find('#timeline').val(),
        'agreed_target': formsList[i].find('#agreed_target').val(),
        'goal_description': formsList[i].find('#goal_description').val(),
        'kpi': formsList[i].find('#kpi').val(),
        'specific_task': formsList[i].find('#specific_task').val()
      }
      console.log(checkForEmptyObject(data[i]));
      if (!checkForEmptyObject(data[i])) {
        delete data[i];
      }
    }    
    console.log("Data to save", data);
    if (Object.keys(data).length == 0) {
      $('.alert').remove();
      $('.form-parent').prepend(
        `<div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
        <b>You cannot save empty goals.</b>
        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
        </button></div>`
      )
      $('html, body').scrollTop(0);
    } else {
      console.log("SAVING DATA")
      saveGoals(data);
    }
  });

  // function formatJSON (dataToTransform) {
  //   const defaultJSON = {}
  //   let key = 0;
  //   for (let goal of dataToTransform) {
  //     console.log(goal);
  //     const goalTemplate = {
  //       goal_description: goal.goal_description,
  //       specific_task: goal.specific_task,
  //       agreed_target: goal.agreed_target,
  //       kpi: goal.kpi,
  //       corporate_objective: goal.corporate_objective,
  //       balanced_scorecard: goal.balanced_scorecard,
  //       weight: goal.weight,
  //       timeline: goal.timeline
  //     }
  //     console.log(goalTemplate);
  //     if (checkForEmptyObject(goalTemplate))
  //       defaultJSON[key] = goalTemplate;
  //     key++;
  //   }
  //   console.log(defaultJSON);
  //   return defaultJSON;
  // }

  function checkForEmptyObject (goalObject) {
    const objectKeys = Object.keys(goalObject);
    const exceptions = ["goal_form_id", "weight", "balanced_scorecard", "corporate_objective"];
    for (let key of objectKeys) {
      if (!exceptions.includes(key)) {
        if (goalObject[key]) return true;
      }
    }
    return false;
  }

  function saveGoals (goals) {
    var $csrf_token = $('[name="csrfmiddlewaretoken"]').attr('value');

    $.ajax({
      type: 'POST',
      url: '/set_goals/',
      data: goals,
      headers: {
        "X-CSRFTOKEN": $csrf_token,
      },
      success: function (data) {
        $('.alert').remove();
        $('.form-parent').prepend(
          `<div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
          <b>Goal data saved successfully! You are yet to submit your goals.</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
        $('html, body').scrollTop(0);
      },
      error: function (error) {
        $('.alert').remove();
        $('.form-parent').prepend(
          `<div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
          <b>ERROR: Goal data was not saved. ${error.responseJSON.statusMsg || "Error goals not saved"}</b>
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
          </button></div>`
        )
        $('html, body').scrollTop(0);
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

// ALL ABOVE CODE WILL BE REFACTORED TO FIT APPRAISAL

  $('.multi-step-appraisal-form-nav-link').on("click", function () {
    const active_link = $('.multi-step-appraisal-form-nav-link.active').removeClass('active');
    const new_active_link = $(this);
    new_active_link.addClass('active');
    current_active_link_id = active_link.attr('id');
    new_active_link_id = new_active_link.attr('id');
    $(`div#${current_active_link_id}`).addClass('d-none');
    $(`div#${new_active_link_id}`).removeClass('d-none');
  })

});




// [
//   {"objective": "Reduce ATC&C Loss", "link_to_balance_scorecard": "Financial"}, 
//   {"objective": "Revenue Growth & Profitability", "link_to_balance_scorecard": "Financial"}, 
//   {"objective": "Achieve Financial Viability", "link_to_balance_scorecard": "Financial"}, 
//   {"objective": "Re-design Customer Experience", "link_to_balance_scorecard": "Customer"}, 
//   {"objective": "Stakeholder Engagement", "link_to_balance_scorecard": "Process"}, 
//   {"objective": "Compliance with Re-engineered Business Processes", "link_to_balance_scorecard": "Process"}, 
//   {"objective": "Regulatory Compliance", "link_to_balance_scorecard": "Process"}, 
//   {"objective": "Increase Technology Adoption", "link_to_balance_scorecard": "Innovation, Growth & Learning"},
//