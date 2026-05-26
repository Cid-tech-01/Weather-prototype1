import React from 'react'
import './Weather.css'
import search_icon from '../assets/search1.png'
import clear_icon from '../assets/clear.png'
import moon_icon from '../assets/night.png'
import cloudy_icon from '../assets/CLOUD.png'   // <-- corrected
import rainy_icon from '../assets/RAIN.png'
import storm_icon from '../assets/STORM.png'
import Snow_icon from '../assets/Snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/Wind.png'
import drizzle_icon from '../assets/drizzle.png'
import {useEffect,useState,useRef} from 'react'



const Weather = () => {
const inputRef=useRef();
  const [weatherData, setWeatherData] = useState({
  humidity: "",
  windSpeed: "",
  tempreture: "",
  location: "",
  icon: clear_icon
});

const allIcons = {
  "01d": clear_icon,   // clear sky (day)
  "01n": moon_icon,    // clear sky (night)
  "02d": cloudy_icon,  // few clouds (day)
  "02n": cloudy_icon,  // few clouds (night)
  "03d": cloudy_icon,  // scattered clouds (day)
  "03n": cloudy_icon,  // scattered clouds (night)
  "04d": drizzle_icon, // broken clouds (day)
  "04n": drizzle_icon, // broken clouds (night)
  "09d": rainy_icon,   // shower rain (day)
  "09n": rainy_icon,   // shower rain (night)
  "10d": rainy_icon,   // rain (day)
  "10n": rainy_icon,   // rain (night)
  "11d": storm_icon,   // thunderstorm (day)
  "11n": storm_icon,   // thunderstorm (night)
  "13d": Snow_icon,    // snow (day)
  "13n": Snow_icon,    // snow (night)
  "50d": cloudy_icon,  // mist/fog (day)
  "50n": cloudy_icon,  // mist/fog (night)
};


  const search=async(city)=>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url);
        const data=await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }

        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed*3.6),
          tempreture: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })
    }catch(error){
        setWeatherData(false);
        console.error("Error in fetching weather data");
    }
  }

 useEffect(()=>{
    search("Delhi");
  }, [])


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='search' />
            <img className='search' onClick={()=>search(inputRef.current.value)} src={search_icon} alt="Search-icon" height="16px" width="16px"/>
        </div>
        {weatherData?<>
                  <img 
                      src={weatherData.icon} 
                      alt="Weather Icon" 
                      className="weather-icon"
                    />
          <p className='temperature'>{weatherData.tempreture}°c</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <svg className="humidity-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z" 
        fill="none" stroke="white" strokeWidth="2"/>
</svg>

              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
             <div className="col">
              <svg className="wind-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M4 12h13a3 3 0 1 0-3-3" stroke="white" strokeWidth="2" fill="none" />
  <path d="M4 18h9a2 2 0 1 0-2-2" stroke="white" strokeWidth="2" fill="none" />
</svg>

              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>:<></>}
    </div>
  )
}

export default Weather