import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "material-ui"
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import { sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"
function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countrtInfo, setCountryInfo] =useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCointriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {


          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data) 
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
    }

    getCointriesData()
  }, [])


  const onCountryChange = (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

     fetch(url)
    .then(response => response.json())
    .then((data) => {
      setCountry(countryCode)
      setCountryInfo(data)

      setMapCenter([data.countrtInfo.lat, data.countrtInfo.long])
      setMapZoom(4)
    })
  }

  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        {/* Title + Select I/p Dropdown field */}

        <div className="app_header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Lopp through all the countries */}

              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>

          </FormControl>
        </div>

        {/* InfoBoxes */}

        <div className="app_stats">
          {/* InfoBoxes title ="coronavirus cases" */}
          <InfoBox title="Coronavirus Cases" cases={countrtInfo.todayCases} total={countrtInfo.cases} />

          {/* InfoBoxes title ="Recovered" */}
          <InfoBox title="Recovered" cases={countrtInfo.todayRecovered} total={countrtInfo.recovered} />

          {/* InfoBoxes title ="Deaths" */}
          <InfoBox title="Deaths" cases={countrtInfo.todayDeaths} total={countrtInfo.deaths} />
        </div>

        {/* Map */}

        <Map
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom} />
      </div>


      <CardContent>
      <Card className="app_right">
        
        {/* Table */}
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}/>
        <h3>Worldwide new cases</h3>


        {/* Graph */}

        <LineGraph />
      </Card>
      </CardContent>
    </div>

  );
}

export default App;
