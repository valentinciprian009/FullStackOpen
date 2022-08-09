import numbersService from './services/numbers'
import Button from './Button'

const Person = ({ person, persons, setPersons, filteredPersons, setFilteredPersons, setErrorMessage, setIsError }) => {
    const acceptRemove = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            numbersService
                .deletePerson(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))
                    setIsError(false)
                    setErrorMessage(
                        `Deleted ${person.name}`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }
                        , 5000)
                })
                .catch(error => {
                    // console.log(error);
                    setPersons(persons.filter(p => p.id !== person.id))
                    setFilteredPersons(filteredPersons.filter(p => p.id !== person.id))

                    setIsError(true)
                    setErrorMessage(
                        `Information of ${person.name} has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }
                        , 5000)
                })
        }
    }

    return (
        <div>
            <p>{person.name} {person.number}</p>
            <Button text="remove" onClick={() => acceptRemove()} />
        </div>
    )
}

export default Person