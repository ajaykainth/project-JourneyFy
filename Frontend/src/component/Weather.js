import { Fragment, useEffect, useState } from "react"
import { fetch5DaysWeather, fetchGeoLocation, fetchLocationKey, fetchWeather } from "../Services/WeatherApi"

// import raining from "../assets/raining.png"
// import snow from "../asset/snow.png"
// import cloudy from "../asset/cloudy.png"
// import cloudyy from "../asset/cloudy (1).png"
// import foggy from "../asset/foggy.png"
// import storm from "../asset/storm.png"
// import rainyday from "../asset/rainy-day.png"
// import sun from "../asset/sun.png"

export default function Weather({ location }) {

    let now = new Date();

    // Extract the hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Determine AM or PM suffix
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minutes and seconds with leading zeros
    minutes = String(minutes).padStart(2, '0');

    // Format the time string
    const timeString = `${hours}:${minutes}${ampm}`;

    console.log(timeString);

    const weatherCodes = {
        0: { description: "Clear sky", emoji: "/assets/img/sun.png" },
        1: { description: "Mainly clear", emoji: "/assets/img/cloudy.png" },
        2: { description: "Partly cloudy", emoji: "/assets/img/cloudy.png" },
        3: { description: "Cloudy", emoji: "/assets/img/cloudyy.png" },
        45: { description: "Fog", emoji: "/assets/img/foggy.png" },
        51: { description: "Light drizzle", emoji: "/assets/img/rainy-day.png" },
        61: { description: "Slight rain", emoji: "/assets/img/raining.png" },
        63: { description: "Moderate rain", emoji: "/assets/img/raining.png" },
        65: { description: "Heavy rain", emoji: "/assets/img/raining.png" },
        71: { description: "Slight snow fall", emoji: "/assets/img/snow.png" },
        73: { description: "Moderate snow fall", emoji: "/assets/img/snow.png" },
        75: { description: "Heavy snow fall", emoji: "/assets/img/snow.png" },
        80: { description: "Slight rain showers", emoji: "/assets/img/rainy-day.png" },
        81: { description: "Moderate rain showers", emoji: "/assets/img/rainy-day.png" },
        82: { description: "Violent rain showers", emoji: "/assets/img/storm.png" },
        85: { description: "Slight snow showers", emoji: "/assets/img/snow.png" },
        86: { description: "Heavy snow showers", emoji: "/assets/img/snow.png" },
        95: { description: "Thunderstorm", emoji: "/assets/img/storm.png" }
    };

    const weekdays = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thur",
        5: "Fri",
        6: "Sat",
    }
    // let weatherCodes=""

    const [weatherData, setWeatherData] = useState([])
    // const [location, setLocation] = useState("")
    // console.log(weatherCodes[weatherData[0]?.weathercode]?.emoji);
    // const Api_key="8ed62507b4b9f55c0b4be3190f111821"
    console.log(location);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // const location_key = await fetchLocationKey(location);
                // const weather = await fetch5DaysWeather(location_key);


                // setWeatherData(weather);
                // console.log(weather);
                const geoLocation = await fetchGeoLocation(location)
                console.log(geoLocation);

                const { lat, lon } = geoLocation[0]
                console.log(lat, lon);

                const data = []
                const weather = await fetchWeather(lat, lon)
                console.log(weather);
                for (let i = 0; i < weather.time.length; i++) {
                    const newObject = {
                        date: weather.time[i], min: weather.temperature_2m_min[i], max: weather.temperature_2m_max[i], weathercode: weather.weathercode[i]
                    }
                    data.push(newObject)

                }
                setWeatherData(data)
                console.log(data);


            } catch (err) {
                console.log(err);
            }
        };
        // console.log(weatherCodes[weatherData[0]?.weathercode.emoji]);
        fetchWeatherData();
    }, [location]);
    if (!location) return null
    return (
        <>
            {/* Weather */}
            <div>
                <div className="container mt-5">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <div className="weather__card">
                            <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                                <div className="p-3">
                                    <h2>{Math.floor((weatherData[0]?.max + weatherData[0]?.min) / 2)}°</h2>
                                </div>
                                <div className="p-3">
                                    <img src={weatherCodes[weatherData[0]?.weathercode]?.emoji} />
                                </div>
                                <div className="p-3">
                                    <h5 className="mb-4">{new Date(weatherData[0]?.date).toLocaleDateString(undefined, { weekday: "long" })},{timeString}</h5>
                                    <h3 className="mb-4">{location}</h3>
                                    <span className="weather__description">{weatherCodes[weatherData[0]?.weathercode]?.description}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Weather Forecast */}
                <div className="weather__forecast d-flex flex-row flex-wrap justify-content-center align-items-center mt-3">

                    {weatherData.map((weather, index) => {
                       
                        if (index === 0) return
                        return <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                            <span>{weekdays[new Date(weather.date).getDay()]}</span>
                            <img src={weatherCodes[weather.weathercode]?.emoji} />
                            <span>{Math.floor((weather.min+weather.max)/2)}°</span>
                        </div>
                        
                    })}

                </div>
            </div>
        </>

    )
}