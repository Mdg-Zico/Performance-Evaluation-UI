document.addEventListener('DOMContentLoaded', function () {
    // Template for the form repeater item
    const formRepeaterItemTemplate = `
    <div data-repeater-item="" class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col mb-3">
            <label for="objective" class="form-label">Corporate Objectives (Strategic focus)</label>
            <select class="form-select" name="objective" id="focus" required>
              <option class="default" value="">Focus point </option>
              <option value="">Focus point</option>
              <option value="">Focus point</option>
              <option value="">Focus point</option>
              <option value="">Focus point</option>
              <option value="">Focus point</option>
            </select>
          </div>
          <div class="col mb-3">
            <label for="scorecards" class="form-label">Link to balance scorecards</label>
            <div class="form-control" id="scorecards" name="scorecards" value="">NULL</div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="goal" class="form-label">Goal</label>
        <textarea class="form-control" name="goal" value="" id="exampleInputGoal" aria-describedby="goalHelp" required></textarea>
        <div id="goalHelp" class="form-text">Short text describing your goal</div>
      </div>
      <div class="mb-3">
        <label for="task" class="form-label">Specific tasks to be accomplished</label>
        <textarea class="form-control" name="task" value="" id="task" aria-describedby="goaldescHelp" required></textarea>
        <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div>
      </div>
      <div class="mb-3">
        <label for="target" class="form-label">Agreed Target</label>
        <textarea class="form-control" name="target" value="" id="target"></textarea>
        <!-- <div id="goaldescHelp" class="form-text">Highlight the tasks to be accomplished with respect to your goal</div> -->
      </div>
      <div class="mb-3">
        <label for="kpi" class="form-label">Achievement Criteria (KPIs)</label>
        <textarea class="form-control" name="kpi" value="" id="kpi" required></textarea>
        <div id="goaldescHelp" class="form-text">Highlight the key performance indexes of your goal</div>
      </div>
      <section class="container-fluid">
        <div class="row">
          <div class="col mb-3 w-25">
            <label for="weight" class="form-label">Weight</label>
            <input type="number" name="weight" value="0" min="0" class="form-control" id="weight" required/>
          </div>
          <div class="col mb-3 w-25">
            <label for="timeline" class="form-label">Timeline</label>
            <input type="datetime-local" class="form-control" id="timeline"/>
          </div>
        </div>
      </div>          
      <div class="d-flex align-items-center justify-content-around">
          <button data-repeater-delete="" class="btn rounded-pill px-4 w-5 btn-danger">
            <div class="d-flex align-items-center">
              Delete
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 fs-5 ms-1" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </div>
          </button>
          </div>
      </div>
    `;
    
  
    // Function to add a new form repeater item
    function addNewFormRepeaterItem() {
      // Clone the form repeater item template

      const repeaterContainer = document.querySelector('[data-repeater-list]');
      const repeaternav = repeaterContainer.querySelector('.nav')
      let count = repeaternav.children.length;
      const clonedItem = document.createElement('div');
      clonedItem.className = 'goal_'+(count++);
      clonedItem.innerHTML = formRepeaterItemTemplate;

      const newtab = document.createElement('li')
      newtab.setAttribute("style", "cursor: pointer;");
      newtab.className = 'nav-item goal_'+(count);
      newtab.innerHTML = "<span class='nav-link'>Goal "+(count)+"</span>"
      repeaternav.appendChild(newtab);
      // Append the cloned item to the repeater container
      repeaterContainer.appendChild(clonedItem);
    }

    // Function to handle the delete action using event delegation
    function handleRepeaterActions(event) {
      if (event.target.matches('[data-repeater-delete]')) {
        console.log("Clicked delete button");
        const currentItem = event.target.closest('[data-repeater-item]');
        if (currentItem) {
          currentItem.remove();
        }
      }
    }

    //Function to handle form navigation
    function handleNavigation(event) {
      console.log("Click on nav link detected");
      console.log(event.target);
    }

    // Attach click event to navigation tabs
    const navElement = document.querySelector('#form-navigation').querySelectorAll('li');
    console.log(navElement);

    // Attach click event to the initial "Add" button
    document.querySelector('[data-repeater-create]').addEventListener('click', addNewFormRepeaterItem);

    // Attach click event to the container for event delegation
    document.querySelector('[data-repeater-list]').addEventListener('click', handleRepeaterActions);
  });