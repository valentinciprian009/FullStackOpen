const Weather = ({ weather }) => {
    return (
        <div>
            <p>Forecast: {weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}</p>
            <p>Wind: {weather.wind.speed} mph direction {weather.wind.deg}</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" width={100} />
        </div>
    )
}

export default Weather