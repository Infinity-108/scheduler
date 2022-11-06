import React, { useState, useEffect } from 'react';
import './App.css';

import {CourseList} from './components/CourseList';

// a component that shows the title
const Banner = ({ title }) => (
  <h1>{ title }</h1>
);




const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

//add schedule time functions
const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});




// This function gets the schedule JSON data and stores it using setschedule. await and async are used because fetch and response.json are asynchronous functions meaning that they ,ust use await and async to allow our code to use the data when it finally arrives without having to make the browser stop and wait.
const App = () =>  {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, [])

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className='container'>
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );

  };

export default App;