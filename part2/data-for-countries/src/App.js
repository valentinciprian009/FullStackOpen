import axios from 'axios'
import { useState, useEffect } from 'react'
import Countries from './Countries'

function App() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setData(res.data)
        setFilteredData(res.data)
      })
  }, [])

  const filterCountries = (event) => {
    const filter = event.target.value
    const filtered = data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    setFilteredData(filtered)
  }
  
  const filterCountry = (country) => {
    setFilteredData([country])
  }

  return (
    <div className="App">
      <h1>Filter</h1>
      Find countries: <input onChange={filterCountries} />
      <h1>Countries</h1>
      <Countries countries={filteredData} filterCountry={filterCountry}/>
    </div>
  );
}

export default App;
