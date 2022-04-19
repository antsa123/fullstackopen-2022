const Header = ({course}) => {
    return (
      <h2>{course}</h2>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
        {
            parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}/>)
        }
      </>
    )
  }
  
  const Part = ({part, exercise}) => {
    return (
      <>
        <p>
          {part} {exercise}
        </p>
      </>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <>
        <p><b>Number of exercises {parts.reduce((n, {exercises}) => n + exercises, 0)}</b></p>
      </>
    )
  }


const Course = ({course}) => {
    return (
      <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </div>
    )
  }

export default Course