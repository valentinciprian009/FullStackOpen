const Total = (props) => {
    return (
        <p>Number of exercises {
            props.parts.map(part => part.exercises).reduce((a, b) => a + b)
        }</p>
    )
}

export default Total