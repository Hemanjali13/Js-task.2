const data = {
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
                "amount": 1286.23,
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

  // Find the minimum and maximum dates by grouping the data of division, sub division, and tasks
function findMinMaxDates(data) {
  let minDate = null;
  let maxDate = null;

  // Iterate through each division
  for (let division of data.divisions) {
    // Check if division has sub divisions
    if (division.subDivisions) {
      // Iterate through each sub-division
      for (let subDiv of division.subDivisions) {
        // Check if sub-division has tasks
        if (subDiv.tasks) {
          // Iterate through each task
          for (let task of subDiv.tasks) {
            // Extract start and end dates
            const startDate = new Date(task.taskStartDate);
            const endDate = new Date(task.taskEndDate);

            // Compare with minimum date found so far
            if (!minDate || startDate < minDate) {
              minDate = startDate;
            }

            // Compare with maximum date found so far
            if (!maxDate || endDate > maxDate) {
              maxDate = endDate;
            }
          }
        }
      }
    }
  }

  // Return the minimum and maximum dates found
  return { minDate, maxDate };
}

// Call the findMinMaxDates function with the data 
const { minDate, maxDate } = findMinMaxDates(data);

// Output the minimum and maximum dates found
console.log(`Minimum date: ${minDate}`);
console.log(`Maximum date: ${maxDate}`);

  // Validate tasks
function validateTasks(tasks, subDivisionAmount) {
  let totalTaskAmount = 0;
  for (let task of tasks) {
    const taskStartDate = new Date(task.taskStartDate);
    const taskEndDate = new Date(task.taskEndDate);
    const durationDays = (taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24);

    if (durationDays !== task.originalDurationDays) {
      console.log(`Invalid task duration for ${task.taskNumber}. Original duration: ${task.originalDurationDays}, actual duration: ${durationDays}`);
      return false;
    }

    if (taskStartDate >= taskEndDate) {
      console.log(`Invalid task dates for ${task.taskNumber}. End date should be after start date.`);
      return false;
    }

    totalTaskAmount += task.amount;
  }
  // Check if total task amount matches sub division amount
  if (totalTaskAmount !== subDivisionAmount) {
      console.log(`Total task amount doesn't match sub division amount for ${tasks[0].subDivisionNumber}`);
      return false;
    }
  
    return true;
  }

  // Validate sub divisions
  function validateSubDivisions(subDivisions) {
    for (let subDiv of subDivisions) {
      if (!validateTasks(subDiv.tasks, subDiv.amount)) {
        return false;
      }

      const subDivStartDate = new Date(subDiv.subDivStartDate);
      const subDivEndDate = new Date(subDiv.subDivEndDate);
      const durationDays = (subDivEndDate - subDivStartDate) / (1000 * 60 * 60 * 24);

      if (durationDays !== subDivisions.originalDurationDays) {
        console.log(`Invalid subDivisions duration for ${subDivisions.subDivisionsNumber}. Original duration: ${subDivisions.originalDurationDays}, actual duration: ${durationDays}`);
        return false;
      }
  
      if (subDivStartDate >= subDivEndDate) {
        console.log(`Invalid sub division dates for ${subDiv.subDivisionNumber}. End date should be after start date.`);
        return false;
      }
    }
    return true;
  }

  // Validate divisions
  function validateDivisions(divisions) {
    for (let division of divisions) {
      if (division.subDivisions) {
        if (!validateSubDivisions(division.subDivisions)) {
          return false;
        }
      }

      const divStartDate = new Date(division.divStartDate);
      const divEndDate = new Date(division.divEndDate);
      const durationDays = (divEndDate - divStartDate) / (1000 * 60 * 60 * 24);

      if (durationDays !== divisions.originalDurationDays) {
        console.log(`Invalid Divisions duration for ${division.divisionsNumber}. Original duration: ${divisions.originalDurationDays}, actual duration: ${durationDays}`);
        return false;
      }

      if (divStartDate >= divEndDate) {
        console.log(`Invalid division dates for ${division.divisionNumber}. End date should be after start date.`);
        return false;
      }
    }
    return true;
  }

  // Validate data
  function validateData(data) {
    if (!validateSubDivisions(data.divisions[0].subDivisions)) {
      return false;
    }
    if (!validateDivisions(data.divisions)) {
      return false;
    }
    return true;
  }

  console.log(validateData(data));
