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
  
  // Validate start and end dates of sub divisions
  function validateSubDivisionDates(subDivisions) {
    let minStartDate = subDivisions[0].subDivStartDate;
    let maxEndDate = subDivisions[0].subDivEndDate;
  
    for (let subDiv of subDivisions) {
      if (new Date(subDiv.subDivStartDate) < new Date(minStartDate)) {
        minStartDate = subDiv.subDivStartDate;
      }
      if (new Date(subDiv.subDivEndDate) > new Date(maxEndDate)) {
        maxEndDate = subDiv.subDivEndDate;
      }
      if (new Date(subDiv.subDivStartDate) > new Date(subDiv.subDivEndDate)) {
        console.log(`Invalid sub division dates for ${subDiv.subDivisionNumber}`);
        return false;
      }
    }
    console.log(`Sub division start date: ${minStartDate}`);
    console.log(`Sub division end date: ${maxEndDate}`);
    return true;
  }
  
  // Validate tasks
  function validateTasks(tasks, subDivisionAmount) {
    let totalTaskAmount = 0;
    for (let task of tasks) {
      const taskStartDate = new Date(task.taskStartDate);
      const taskEndDate = new Date(task.taskEndDate);
      const durationDays = (taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24) + 1;
  
      if (durationDays !== task.originalDurationDays) {
        console.log(`Invalid task duration for ${task.taskNumber}`);
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
      }
      return true;
    }
    
    // Validate divisions
    function validateDivisions(divisions) {
      for (let division of divisions) {
        if (division.subDivisions) {
          if (!validateSubDivisionDates(division.subDivisions)) {
            return false;
          }
          if (!validateSubDivisions(division.subDivisions)) {
            return false;
          }
        }
      }
      return true;
    }
    
    // Validate data
    function validateData(data) {
      if (!validateSubDivisionDates(data.divisions[0].subDivisions)) {
        return false;
      }
      if (!validateSubDivisions(data.divisions[0].subDivisions)) {
        return false;
      }
      if (!validateDivisions(data.divisions)) {
        return false;
      }
      return true;
    }
    
    console.log(validateData(data));
