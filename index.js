function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}

// Export for test access if needed
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
};// Your code here
