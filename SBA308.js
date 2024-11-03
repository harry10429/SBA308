// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }


    }
];

function getLearnerData(course, ag, submissions) {
    let result = [];
    const endOfCourseDate = "2024-01-01";
    const startOfCourseDate = "2023-01-01";
    const courseID = course.id;

    let learnerArr = [];

    //store unqiue learner id in learner Arr
    for (let i of submissions) {
        if (!learnerArr.includes(i.learner_id)) {
            learnerArr.push(i.learner_id);
        }
    }

    for (let y in learnerArr) {
        result[y] = {};
        let resultTemp = result[y];
        //make sure assgiment is under right course ID
        switch (ag.course_id) {
            case course.id:
                resultTemp['courseID'] = courseID;
                break;
            default:
                resultTemp['courseID'] = 'Unknown Course ID'
        }
        resultTemp['id'] = learnerArr[y];

        let assignTotal = 0;
        let learnerTotal = 0;
        let tempArr = ag.assignments;
        //Mark assignment with incorrect due date
        for (let assignment of tempArr) {
            try {

                if (assignment.due_at < startOfCourseDate || assignment.due_at > endOfCourseDate) {

                    throw "illegal Assignment due date";

                }
            }
            catch (err) {

                assignment.name = "invalid";


            }
        }


        for (let i of submissions) {

            for (let j of tempArr) {


                if (i.assignment_id == j.id && i.learner_id == learnerArr[y] && j.name != "invalid") {

                    let tempObj = i.submission;

                    //calculate assignment percentage of grade and average (include late penalty)
                    if (tempObj.submitted_at > j.due_at) {
                        learnerTotal += tempObj.score - (j.points_possible * 0.1);
                        assignTotal += j.points_possible;
                        if (tempObj.score - (j.points_possible * 0.1) > 0) {
                            let portionGrade = (tempObj.score - (j.points_possible * 0.1)) * 1.0 / j.points_possible;
                            resultTemp["Assignment " + i.assignment_id + " grade percentage"] = portionGrade;
                        } else {
                            let portionGrade = 0;
                            resultTemp["Assignment " + i.assignment_id + " grade percentage"] = portionGrade;
                        }

                    } else {
                        learnerTotal += tempObj.score;
                        assignTotal += j.points_possible;
                        let portionGrade = tempObj.score * 1.0 / j.points_possible;
                        resultTemp["Assignment " + i.assignment_id + " grade percentage"] = portionGrade;
                    }
                }
            }
        }

        resultTemp['avg'] = learnerTotal * 1.0 / assignTotal;

    }
    return result;
}




// here, we would process this data to achieve the desired result.
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// return result;



const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
