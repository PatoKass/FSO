const Course = ({ course: { name, id, parts } }) => {
  return (
    <>
      <Header header={name} id={id} />
      <Content parts={parts} />
    </>
  )
}

const Header = ({ header, id }) => {
  return <h1 key={id}>{header} </h1>
}

const Content = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0) // default value 0 so that it doesn't return NaN

  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          {part.name}: {part.exercises}
        </div>
      ))}
      <div>total of {total} exercises</div>
    </div>
  )
}

export default Course
