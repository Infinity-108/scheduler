//course conflict functions
const days = ['M', 'Tu', 'W', 'Th', 'F'];
export const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};



//checks for conflicts
export const hasConflict = (course, selected) => (
    selected.some(selection => courseConflict(course, selection))
  );

const courseConflict = (course1, course2) => (
    getCourseTerm(course1) === getCourseTerm(course2) && timeConflict(course1, course2)
);

const timeConflict = (course1, course2) => (
    daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
  );

const daysOverlap = (days1, days2) => ( 
    days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
    Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);



// Gets the first letter of  the ID to match it to an element with the terms object
export const getCourseTerm = course => (
    terms[course.id.charAt(0)]
  );

