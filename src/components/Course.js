import { hasConflict,getCourseTerm} from '../utilities/times.js';


// This gets the course number only for a respective course
const getCourseNumber = course => (
    course.id.slice(1, 4)
  );
  
  //This is used to omit a course that we no longer what selected
  const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );

// This is the course component which renders the course term, course number and title
const Course = ({ course,selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return(
    <div className='card m-1 p-2'
    style={style}
    onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}>
      <div className="card-body">
        <div className="card-title">
          <b>
            <h4>
              { getCourseTerm(course) } CS { getCourseNumber(course) }
            </h4>
          </b>
        </div>
        <div className="card-text">
          { course.title }
        </div>
        <div className="card-text">
          { course.meets }
        </div>
      </div>
    </div>
  );
    }

export default Course;
