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
    'form': 'goal_evaluation',
    ...appraisal_data['goal_evaluation'],
};

let behavioural_assessment = {
    'form': 'behavioural_assessment',
    ...appraisal_data['behavioural_assessment'],
};

let key_accomplishment = {
    'form': 'key_accomplishment',
    ...appraisal_data['key_accomplishment']
};

let performance_improvement = {
    'form': 'performance_improvement',
    ...appraisal_data['performance_improvement']
};

let overall_score_section_B = {
    'form': 'overall_score_section_B',
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
        url: '#',
        dataType: 'json',
        data: data,
        type: 'POST',

        success: function (data) {
            // Alert that saving is successful
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
    reassignFormData();
    console.log("Overall result object", appraisal_data);
}

const updateFunctions = {
    'goal_evaluation': updateGoalEvaluation,
    'behavioural_assessment': updateBehaviouralAssessment,
    'key_accomplishment': updateKeyAccomplishment,
    'performance_improvement': updatePerformanceImprovement,
}

// REASSIGN APPRAISAL FORMS DATA ON UPDATE
function reassignFormData() {
    goal_evaluation = {
        'key': 'goal_evaluation',
        ...appraisal_data['goal_evaluation'],
    };
    behavioural_assessment = {
        'key': 'behavioural_assessment',
        ...appraisal_data['behavioural_assessment'],
    };
    key_accomplishment = {
        'key': 'key_accomplishment',
        ...appraisal_data['key_accomplishment']
    };
    performance_improvement = {
        'key': 'performance_improvement',
        ...appraisal_data['performance_improvement']
    };
    overall_score_section_B = {
        'key': 'overall_score_section_B',
        ...appraisal_data['overall_score_section_B']
    };
    console.log("Goal evaluation: ", goal_evaluation);
    console.log("Behavioural assessment: ", behavioural_assessment);
    console.log("Key accomplishment: ", key_accomplishment);
    console.log("Performance improvement: ", performance_improvement);
    console.log("Overall score: ", overall_score_section_B);
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
    referenceObject = appraisal_data['behavioural_assessment'];
    values = Object.values(referenceObject);
    totalScore = values.reduce((total, num) => {
        total += num;
    }, 0);
    return totalScore;
}

// UTILITY FUNCTIONS
// function monitorSectionBScore() {
//     const behavioural_assessment_elements = $('.behavioural_assessment_form').find('input');
//     for (const elem of behavioural_assessment_elements) {
//         elem.on('change', function () {console.log('I SEE WHAT YOU DOING')});
//     }    
// }
// monitorSectionBScore();
// updateBehaviouralAssessment(appraisal_data['behavioural_assessment'])
// 1) There's a possibility for radical change in the app
