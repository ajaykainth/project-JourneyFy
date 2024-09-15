// const apiKey = "zkv5ShSbLLGx5y2rJDJkt9r2pl7f1mo4";
const apiKey = "5977571d8496f2f54577387b232aba4f"

// async function fetchLocationKey(cityName) {
//  try{
//   const response = await fetch(
//     `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`,
//   );

//   const data = await response.json();
//   return data[0].Key;
//  }
//  catch(err){
//   console.log(err);
//  }
// }
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

// async function fetch5DaysWeather(locationKey) {
//   const response = await fetch(
//     `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`,
//   );
//   return await response.json();
// }

export { fetchGeoLocation, fetchWeather };
