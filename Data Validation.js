const input = {
  "totalAmount": 2986.23,
  "startDate": "03/30/2023",
  "finishDate": "06/20/2023",
  "totalDuration": 82,
  "divisions": [
    {
      "divisionNumber": "1",
      "amount": 2586.23,
      "divStartDate": "04/01/2023",
      "divEndDate": "06/20/2023",
      "originalDurationDays": 80,
      "subDivisions": [
        {
          "subDivisionNumber": "1.1",
          "amount": 2386.23,
          "subDivStartDate": "04/01/2023",
          "subDivEndDate": "05/05/2023",
          "originalDurationDays": 36,
          "tasks": [
            {
              "taskNumber": "1.1.1",
              "amount": 1100,
              "taskStartDate": "04/01/2023",
              "taskEndDate": "04/20/2023",
              "originalDurationDays": 20
            },
            {
              "taskNumber": "1.1.2",
              "amount": 1287.23,
              "taskStartDate": "04/10/2023",
              "taskEndDate": "05/05/2023",
              "originalDurationDays": 24
            }
          ]
        },
        {
          "subDivisionNumber": "1.2",
          "amount": 20,
          "subDivStartDate": "04/21/2023",
          "subDivEndDate": "06/20/2023",
          "originalDurationDays": 60
        }
      ]
    },
    {
      "divisionNumber": "2",
      "amount": 40,
      "divStartDate": "03/30/2023",
      "divEndDate": "04/05/2023",
      "originalDurationDays": 5
    }
  ]
};

let totalAmount = 0;
let originalDurationDays = 0;
let properData = [];
let improperData = [];

for (let division of input.divisions) {
  if (division.originalDurationDays <= 0) {
    improperData.push(division);
  } else {
    properData.push(division);
    totalAmount += division.amount;
    originalDurationDays += division.originalDurationDays;

    if (division.subDivisions) {
      for (let subDivision of division.subDivisions) {
        if (subDivision.originalDurationDays <= 0) {
          improperData.push(subDivision);
        } else {
          properData.push(subDivision);
          totalAmount += subDivision.amount;
          originalDurationDays += subDivision.originalDurationDays;

          if (subDivision.tasks) {
            for (let task of subDivision.tasks) {
              if (task.originalDurationDays <= 0) {
                improperData.push(task);
              } else {
                properData.push(task);
                totalAmount += task.amount;
                originalDurationDays += task.originalDurationDays;
              }
            }
          }
        }
      }
    }
  }
}

console.log("Proper Data:", properData);
console.log("Improper Data:", improperData);
console.log("Total Amount:", totalAmount);
console.log("Original Duration Days:", originalDurationDays);
