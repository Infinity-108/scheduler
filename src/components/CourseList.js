
import {getCourseTerm, terms} from '../utilities/times.js';
import Course from './Course.js'
import React, { useState} from 'react';

// This is the term selector which appears as a row of buttons
// In Bootstrap, the CSS class btn-group can be used to make a row of butons.
const TermSelector = ({term,setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />)
    }
    </div>
  );

//In JSX, you have to use htmlFor in a label instead of for because for is a reserved word in JavaScript.
export const TermButton = ({term, setTerm,checked}) => (
    <>
      <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked} onChange={() => setTerm(term)} />
      <label class="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );



// CourseList is passed an object with course IDs and course data. Object.values gives access to them

export const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { termCourses.map(course => <Course key={course.id} course={ course } selected={selected} setSelected={ setSelected } />) }
        </div>
     </>
    );
  };


// export default CourseList;