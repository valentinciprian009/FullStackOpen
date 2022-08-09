import Country from "./Country"

const Countries = ({ countries, filterCountry }) => {
    if (countries.length > 10) {
        return (
        <div>
            Too many matches, specify another filter
        </div>
        )
    } else if (countries.length > 1) {
        return (
        <div>
            {countries.map(country => <Country key={country.name.common} country={country} showInfo={false} filterCountry={filterCountry} />)}
        </div>
        )
    } else if (countries.length === 1) {
        return (
        <div>
            <Country country={countries[0]} showInfo={true} />
        </div>
        )
    } else {
        return (
        <div>
            No matches
        </div>
        )
    }
}

export default Countries;