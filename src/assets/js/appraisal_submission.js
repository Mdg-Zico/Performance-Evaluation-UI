$(document).ready();

const appraisal_data = {
    'goal_evaluation': {
        1: {
            'actual_result': '',
            'appraisee_rating': 0,
            'appraiser_rating': 0,
        },
        2: {
            'actual_result': '',
            'appraisee_rating': 0,
            'appraiser_rating': 0,
        },
        3: {
            'actual_result': '',
            'appraisee_rating': 0,
            'appraiser_rating': 0,
        }
    },
    'behavioural_assessment': {
        'job_effectiveness': 0,
        'trust_and_integrity': 0,
        'supervision': 0,
        'dependability': 0,
        'collaboration': 0,
        'organizational_success': 0,
        'customer_orientation': 0,
        'leadership_drive': 0,
        'compliance_and_safety': 0,
        'diversity_and_respect': 0,
        'attendance': 0,
    },
    'key_accomplishment': {
        'accomplishment_1': '',
        'accomplishment_2': '',
        'accomplishment_3': '',
    },
    'performance_improvement': {
        1: {
            'key_strength': '',
            'improvement_area': '',
            'developmental_recommendation': '',
        },
        2: {
            'key_strength': '',
            'improvement_area': '',
            'developmental_recommendation': '',
        },
        3: {
            'key_strength': '',
            'improvement_area': '',
            'developmental_recommendation': '',
        }
    },
    'overall_score_section_B': {
        'section_A': 0,
        'section_B': 0,
    },
};

// const section_A = 0;
// const section_B = 0;

let goal_evaluation = {
    'key': 'goal_evaluation',
    ...appraisal_data['goal_evaluation'],
};

let behavioural_assessment = {
    'key': 'behavioural_assessment',
    ...appraisal_data['behavioural_assessment'],
};

let key_accomplishment = {
    'key': 'key_accomplishment',
    ...appraisal_data['key_accomplishment']
};

let performance_improvement = {
    'key': 'performance_improvement',
    ...appraisal_data['performance_improvement']
};

let overall_score_section_B = {
    'key': 'overall_score_section_B',
    ...appraisal_data['overall_score_section_B']
};

// AJAX TO PULL FROM DATABASE
function getAppraisalDataFromBackend(url) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Handle populating form here
        },
        error: function (error) {
            // ALERT THE USER OF THE ERROR
            console.log(error.message);
        }
    });
};

// AJAX TO SUBMIT APPRAISAL
function submitAppraisal(data) {
    $.ajax({
        url: '#',
        dataType: 'json',
        data: data,
        type: 'POST',
        success: function (data) {
            // Alert tht submission is successful
        },
        error: function (error) {
            // ALERT THE USER OF THE ERROR
            console.log(error.message);
        }
    })
}

// AJAX TO SAVE APPRAISAL DATA
function saveAppraisal(data) {
    // Key specifies which form is being saved
    // URL changes based on form being saved e.g; appraisals/save/?form=goal-evaluation
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        dataType: 'json',
        data: data,
        type: 'POST',

        success: function (response) {
            // Alert that saving is successful
            console.log("Data sent to backend", data);
            console.log("Response from backend", response);
        },
        error: function (error) {
            // ALERT THE USER OF THE ERROR
            console.log(error.message);
        }
    })
}

// UPDATE APPRAISAL DATA
function updateAppraisal(key) {
    let object = appraisal_data[key];
    const resultObject = updateFunctions[key](object);
    object = resultObject;
    reassignFormData(objectsToSave, key);
    saveAppraisal(objectsToSave[key]);
    if (key === 'goal_evaluation' || key === 'behavioural_assessment') {
        reassignFormData(objectsToSave, 'overall_score_section_B');
        saveAppraisal(objectsToSave['overall_score_section_B']);
    }
}

const updateFunctions = {
    'goal_evaluation': updateGoalEvaluation,
    'behavioural_assessment': updateBehaviouralAssessment,
    'key_accomplishment': updateKeyAccomplishment,
    'performance_improvement': updatePerformanceImprovement,
}

const objectsToSave = {
    'goal_evaluation': goal_evaluation,
    'behavioural_assessment': behavioural_assessment,
    'key_accomplishment': key_accomplishment,
    'performance_improvement': performance_improvement,
    'overall_score_section_B': overall_score_section_B,
}

// REASSIGN APPRAISAL FORMS DATA ON UPDATE
function reassignFormData(objectsToReassign, key) {
    objectsToReassign[key] = {
        'key': key,
        ...appraisal_data[key],
    };
   console.log("Reassigned object: ", objectsToReassign[key]);
}


// FUNCTIONS TO UPDATE VARIOUS FORM SECTIONS
function updateGoalEvaluation(appraisalObject) {
    formsChildren = $('.goals-for-evaluation').children();
    formsLength = formsChildren.length;
    keys = Object.keys(appraisalObject);
    innerKeys = Object.keys(appraisalObject[keys[0]]);
    for (let i = 1; i <= formsLength; i++) {
        for (const key of innerKeys) {
            if (appraisalObject[i] == undefined) {
                appraisalObject[i] = {};
            }
            appraisalObject[i][key] = $(`.goal_${i} [name="${key}"]`).val();
        }
    }
    updateOverallScoreB();
    return appraisalObject;
}

function updateBehaviouralAssessment(appraisalObject) {
    keys = Object.keys(appraisalObject);
    for (let key of keys) {
        value = $(`input[name=${key}]:checked`).val();
        if (value > 0) {
            appraisalObject[key] = value;
        }
    }
    console.log('New appraisal object', appraisalObject);
    updateOverallScoreB();
    return appraisalObject;
}

function updateKeyAccomplishment(appraisalObject) {
    keys = Object.keys(appraisalObject);
    for (const key of keys) {
        appraisalObject[key] = $(`[name="${key}"]`).val();
    }
    return appraisalObject;
}

function updatePerformanceImprovement(appraisalObject) {
    formsChildren = $('.performance_improvement_points').children();
    keys = Object.keys(appraisalObject);
    innerKeys = Object.keys(appraisalObject[keys[0]]);
    for (const key of keys) {
        for (const innerKey of innerKeys) {
            appraisalObject[key][innerKey] = $(`.goal_${key} [name="${innerKey}"]`).val();
        }
    }
    return appraisalObject;
}

function updateOverallScoreB() {
    const scoreA = Number($('.sectionA_score').text());
    const scoreB = Number($('.sectionB_score').text());
    const totalScore = Number($('.total_score').text());
    const objectToUpdate = appraisal_data['overall_score_section_B'];
    objectToUpdate['section_A'] = scoreA;
    objectToUpdate['section_B'] = scoreB;
}

// UTILITY FUNCTIONS
$('.form-check-input').on('click', function () {
    const element = $(this);
    monitorBehaviouralAssessmentScores(element, appraisal_data['behavioural_assessment']);
});

function monitorBehaviouralAssessmentScores(formInput, object) {
    const elemGroup = formInput.attr('name');
    const elemValue = Number(formInput.val());
    object[elemGroup] = elemValue;
    const scoreList = Object.values(object);
    const totalScore = computeTotalScore(scoreList);
    displaySectionBScore(totalScore);
}

function computeTotalScore(scoreList) {
    result = scoreList.reduce(sum = (accumulator, item) => {
        return accumulator + item;
    }, 0);
    const percentageResult = ~~((result / 43) * 100);
    return percentageResult;
}

function displaySectionBScore(sectionBScore) {
    const element = $('.sectionB_score');
    element.text(sectionBScore);
    displayTotalScore();
}

function displaySectionAScore(sectionAScore) {
    const element = $('.sectionA_score');
    element.text(sectionAScore);
    displayTotalScore();
}

function displayTotalScore() {
    const element = $('.total_score');
    const sectionA = Number($('.sectionA_score').text());
    const sectionB = Number($('.sectionB_score').text());
    element.text((sectionA + sectionB) / 2);
}
