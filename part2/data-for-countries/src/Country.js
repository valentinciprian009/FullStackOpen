import Button from "./Button"
import Weather from "./Weather"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, showInfo, filterCountry }) => {
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
    var lat = 0
    var lon = 0

    if(!country.capitalInfo.hasOwnProperty("latlang")) {

        lat = 0
        lon = 0
    } else {
        lat = country.capitalInfo.latlng[0]
        lon = country.capitalInfo.latlng[1]
    }
    
    const api_call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`

    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios.get(api_call)
            .then(res => {
                setWeather(res.data)
            })
    }, [])

    if (showInfo && weather.length !== 0) {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <h2>Flag</h2>
                <img src={country.flags.png} alt="Flag" width="200" />
                <h2>Weather in {country.capital}</h2>
                <Weather weather={weather} />
            </div>
        )
    } else if (showInfo) {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <h2>Flag</h2>
                <img src={country.flags.png} alt="Flag" width="200" />
            </div>
        )
    } else {
        return (
            <div>
                {country.name.common}
                <Button text="Show" onClick={() => filterCountry(country)} />
            </div>
        )
    }
}

export default Country