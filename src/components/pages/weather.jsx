import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(() => {

    }, [])

    const findWeather = async (q) => {
        const configX = {
            params: {
                q: q,
                units: 'metric',
                APPID: process.env.REACT_APP_WEATHER_API_KEY
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_WEATHER_API}/data/2.5/weather`, configX)
        return data;
    }

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await findWeather(query);
            setWeather(data)
            setQuery("")
        }
    }

    return (
        <>
            <section className="main-container" style={{ backgroundImage: 'url("../../images/assets/weather-bg.jpeg")' }}>
                <input type="text" className="search" placeholder="Search"
                    value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
                {
                    weather.main &&
                    <>

                        <div className="city">
                            <h2 className="city-name">
                                <span>{weather.name}</span>
                                <sup>{weather.sys.country}</sup>
                            </h2>
                            <div className="city-temp">
                                {Math.round(weather.main.temp)}
                                <span>&deg;C</span>
                            </div>
                            <div className="info">
                                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="city-icon" alt={`${weather.weather[0].icon}`} />
                                <p>{`${weather.weather[0].description}`}</p>
                            </div>
                        </div>
                    </>
                }
            </section>
        </>
    )
}

export default Weather;