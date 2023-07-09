
function leadToMinutes(originalTime) {
  const timeInArray = originalTime.split(':');
  if (typeof originalTime === 'string' && timeInArray.length <= 2) {
    timeInArray[0] = Number(timeInArray[0]);
    timeInArray[1] = Number(timeInArray[1]);
    return Number(timeInArray[0] * 60 + timeInArray[1]);
  }
  return null;
}

function timeChecker(workStart, workEnd, meetStart, meetTime){

  const meetEnd = leadToMinutes(meetStart) + meetTime;

  if(leadToMinutes(workStart) <= leadToMinutes(meetStart) && leadToMinutes(workEnd) >= meetEnd) {
    return true;
  }
  return false;
}

timeChecker('08:00', '17:30', '14:00', 90); //true
timeChecker('8:00', '17:30', '08:00', 900); //false
