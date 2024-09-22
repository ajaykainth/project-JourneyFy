// const apiKey = "zkv5ShSbLLGx5y2rJDJkt9r2pl7f1mo4";
require('dotenv').config()
const apiKey = process.env.WEATHER_KEY


async function fetchGeoLocation(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    )
    const data=await response.json();
    return data
  }
  catch (err) {
    console.log(err);
  }
}

 async function fetchWeather(lat,lng){
try{
  const response=await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min`
  )
  const data =await response.json();
  return data.daily
}
catch(err){
console.log(err);
}
 }

export { fetchGeoLocation, fetchWeather };
