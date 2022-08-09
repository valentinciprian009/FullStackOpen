import Person from "./Person"

const Persons = ({ persons, setPersons, filteredPersons, setFilteredPersons, setErrorMessage, setIsError }) => {
    if (filteredPersons.length === 0) {
        return (
            <div>
                <p>No matches</p>
            </div>
        )
    } else if (filteredPersons.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else {
        return (
            <div>
            {filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} filteredPersons={filteredPersons}
             setFilteredPersons={setFilteredPersons} setErrorMessage={setErrorMessage} setIsError={setIsError} />)}
            </div>
        )
    }
}

export default Persons