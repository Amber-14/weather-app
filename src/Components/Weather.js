import React, { useState } from 'react'
import './Weather.css';
import DisplayWeather from './DisplayWeather.js';

function Weather() {
    const [form, setForm] = useState({
        city: '',
        country: ''
    })
    const [weather, setWeather] = useState([]);
    // const weatherdata = async (e) => {
    //     e.preventDefault();

    //     if (data.city === '') {
    //         alert('Enter City')
    //     }
    //     else {

    //         const { wdata } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.country}&appid=${process.env.API_WEATHER_KEY}`)
    //         console.log(wdata)

    //     }
    // }
    const APIKEY = "8c6f3403bafbc7bfdaae408c64f96ac2"
    async function weatherData(e) {
        e.preventDefault();
        if (form.city === "") {
            alert("Add values");
        } else {
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
            )
                .then((res) => res.json())
                .then((data) => data);

            setWeather({ data: data });

        }
    }
    const handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "city") {
            setForm({ ...form, city: value })
        }
        if (name === 'country') {
            setForm({ ...form, country: value })
        }
        // console.log(name, value)
    }

    return (
      <div className="weather">
        <span className="title">Weather App</span>
        <br />

        <form>
          <input
            type="text"
            name="city"
            placeholder="city"
            onChange={(e) => handlechange(e)}
          />
          &nbsp;&nbsp;
          <input
            type="text"
            name="country"
            placeholder="country"
            onChange={(e) => handlechange(e)}
          />
          <button
            type="submit"
            className="getweather"
            onClick={(e) => weatherData(e)}
          >
            Submit
          </button>
        </form>

        {weather.data !== undefined ? (
          <div>
            <DisplayWeather data={weather.data} />
          </div>
        ) : null}
      </div>
    );
}

export default Weather