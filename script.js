const temp=document.getElementById("temp");
const dateTemp=document.getElementById("dateTemp");
dateTemp.textContent= (new Date()).getHours();
const hum=document.getElementById("hum");
const wind=document.getElementById("vent");
const cloud=document.getElementById("nuage");

function initialiser(){
    document.querySelector(".snowy").style.display = "none";
    document.querySelector(".sunny").style.display = "none";
    document.querySelector(".clear-night").style.display = "none";
    document.querySelector(".partly-cloudy").style.display = "none";
    document.querySelector(".cloudy").style.display = "none";
    document.querySelector(".rainy").style.display = "none";
}

function WeatherAnimation() {
    const temp=Number(document.getElementById("temp").textContent);
    const hour=(document.getElementById("dateTemp").textContent).split(':')[0];
    const isDay = hour >= 7 && hour < 18;
    console.log(hour);
    const humidity=Number(document.getElementById("hum").textContent);
    const wind=Number(document.getElementById("vent").textContent);
    const clouds=Number(document.getElementById("nuage").textContent);
    console.log(temp);

    let weather;

    if (temp <= 0) weather = "snowy";
    else if (humidity > 85 && wind < 10 && hour >= 4 && hour <= 9) weather = "foggy";
    else if (wind > 40 && humidity > 70 && temp > 15) weather = "thunderstorm";
    else if (clouds > 80 && humidity > 70 && temp > 5) weather = "rainy";
    else if (clouds > 90) weather = "overcast";
    else if (clouds < 20 && isDay && temp > 15) weather = "sunny";
    else if (clouds < 20 && !isDay) weather = "clear-night";
    else if (clouds < 50 && isDay && temp > 10) weather = "partly-cloudy";
    else if (clouds < 50 && !isDay) weather = "cloudy-night";
    else if (temp < 10 && clouds > 40) weather = "cold-cloudy";
    else weather = "cloudy";
    initialiser()
    console.log(weather);
    switch(weather){
        case "foggy":
            document.body.style.backgroundColor="darkgrey";
            break;
        case "snowy":
            document.querySelector(".snowy").style.display = "block";
            document.body.style.backgroundColor="darkgrey";
            break;
        case "sunny":
            document.querySelector(".sunny").style.display = "block";
            document.body.style.backgroundColor="lightskyblue";
            break;
        case "clear-night":
            document.querySelector(".clear-night").style.display = "block";
            document.body.style.backgroundColor="midnightblue";
            break;
        case "cloudy":
            document.querySelector(".cloudy").style.display = "block";
            document.body.style.backgroundColor="lightgray";
            break;
        case "cloudy-night":
            document.querySelector(".cloudy").style.display = "block";
            document.body.style.backgroundColor="midnightblue";
            break;
        case "rainy":
            document.querySelector(".rainy").style.display = "block";
            document.body.style.backgroundColor="lightskyblue";
            break;
        case "thunderstorm":
            document.querySelector(".rainy").style.display = "block";
            document.body.style.backgroundColor="lightgray";
            break;
        case "partly-cloudy":
            document.querySelector(".partly-cloudy").style.display = "block";
            document.body.style.backgroundColor="lightskyblue";
            break;
    }


}
CurrentLocation()
function CurrentLocation(){
    navigator.geolocation.getCurrentPosition(pos => {
    const curlat = pos.coords.latitude;
    const curlon = pos.coords.longitude;
    console.log(curlat);
    console.log(curlon);
    LoadData(curlat,curlon)
});
}

console.log("looool")


// Select all hour blocks (after you've created them)
const container = document.querySelector('.WeatherPerHour');
if (!container) {
  console.error('No element found with class .WeatherPerHour');
} else {
  container.addEventListener('click', (event) => {
    // find the closest parent with class .hour-block (or itself)
    const block = event.target.closest('.hour-block');

    // if click wasn't inside an hour-block, ignore
    if (!block || !container.contains(block)) return;

    // optional: visually mark selected block
    container.querySelectorAll('.hour-block').forEach(b => b.classList.remove('active'));
    block.classList.add('active');

    // grab the elements inside the clicked block
    const time1 = block.querySelector('.time').textContent;
    const temp1 = block.querySelector('.temp').textContent;
    const hum1 = block.querySelectorAll('.hid')[0].textContent;
    const wind1 = block.querySelectorAll('.hid')[1].textContent;
    const cloud1 = block.querySelectorAll('.hid')[2].textContent;

    // update the details div (you can style this as you want)
    temp.textContent=temp1;
    dateTemp.textContent=time1;
    hum.textContent=hum1;
    wind.textContent=wind1;
    cloud.textContent=cloud1;
    WeatherAnimation()
  });
}

// Loop through each block and add the click event
document.addEventListener('DOMContentLoaded', WeatherAnimation())



const lat = 36.8065; // Example: Tunis
const long = 10.1815;


function LoadData(latitude,longitude){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_min,temperature_2m_max,weathercode&hourly=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,weathercode`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherPerDay = document.querySelector('.WeatherPerDay');
        const weatherPerHour = document.querySelector('.WeatherPerHour');

        const hourly = data.hourly;
        const daily = data.daily;

        const hourlyData = {
        time: hourly.time,
        temperature_2m: hourly.temperature_2m,
        relative_humidity_2m: hourly.relative_humidity_2m,
        wind_speed_10m: hourly.wind_speed_10m,
        cloud_cover: hourly.cloud_cover,
        icon: hourly.weathercode.map(code => getWeatherIcon(code))
        };

        const dailyData = daily.time.map((time, i) => ({
        date: time,
        name: getDayName(time),
        minTemp: daily.temperature_2m_min[i],
        maxTemp: daily.temperature_2m_max[i],
        icon: getWeatherIcon(daily.weathercode[i])
        }));

        // Create 7 days (today + next 6)
        dailyData.forEach((day, index) => {
        const dayBlock = document.createElement('div');
        dayBlock.classList.add('day-block');
        if (index === 0) dayBlock.classList.add('active-day'); // Highlight today

        dayBlock.innerHTML = `
            <div class="day-name">${day.name}</div>
            <div class="date">${day.date}</div>
            <div class="weather-range">${day.minTemp}° - ${day.maxTemp}°</div>
            <div class="icon">${day.icon}</div>
        `;

        // When clicking on a day
        dayBlock.addEventListener('click', () => {
            // 1️⃣ Remove active-day from all
            document.querySelectorAll('.day-block').forEach(d => d.classList.remove('active-day'));
            dayBlock.classList.add('active-day');

            // 2️⃣ Clear current hourly display
            weatherPerHour.innerHTML = '';

            // 3️⃣ Determine which hours to show
            let hourDataToShow;
            const totalHours = hourlyData.time.length;

            if (index === 0) {
            // Today: start from current hour and show 24 hours total
            const now = new Date();
            const currentHourIndex = hourlyData.time.findIndex(t => t.startsWith(now.toISOString().slice(0, 13)));
            hourDataToShow = [];

            for (let i = 1; i <= 24; i++) {
                const idx = (currentHourIndex + i) % totalHours;
                hourDataToShow.push({
                time: hourlyData.time[idx],
                temp: hourlyData.temperature_2m[idx],
                icon: hourlyData.icon[idx],
                hum: hourlyData.relative_humidity_2m[idx],
                wind: hourlyData.wind_speed_10m[idx],
                cloud: hourlyData.cloud_cover[idx]
                });
            }
            } else {
            // Other days: show 24 hours starting from midnight
            const start = index * 24;
            hourDataToShow = hourlyData.time.slice(start, start + 24).map((_, i) => ({
                time: hourlyData.time[start + i],
                temp: hourlyData.temperature_2m[start + i],
                icon: hourlyData.icon[start + i],
                hum: hourlyData.relative_humidity_2m[start + i],
                wind: hourlyData.wind_speed_10m[start + i],
                cloud: hourlyData.cloud_cover[start + i]
            }));
            }

            // 4️⃣ Fill WeatherPerHour
            hourDataToShow.forEach(h => {
            const block = document.createElement('div');
            block.classList.add('hour-block');
            block.innerHTML = `
                <div class="time">${new Date(h.time).getHours()}:00</div>
                <div class="icon">${h.icon}</div>
                <div class="temp">${h.temp}°C</div>
                <div class="hid">${h.hum}</div>
                <div class="hid">${h.wind}</div>
                <div class="hid">${h.cloud}</div>
            `;
            weatherPerHour.appendChild(block);
            });
            const BlockHour=container.querySelectorAll('.hour-block')[0];
            const time1 = BlockHour.querySelector('.time').textContent;
            const temp1 = BlockHour.querySelector('.temp').textContent;
            const hum1 = BlockHour.querySelectorAll('.hid')[0].textContent;
            const wind1 = BlockHour.querySelectorAll('.hid')[1].textContent;
            const cloud1 = BlockHour.querySelectorAll('.hid')[2].textContent;
            temp.textContent=temp1;
            dateTemp.textContent=time1;
            hum.textContent=hum1;
            wind.textContent=wind1;
            cloud.textContent=cloud1;
            WeatherAnimation()
        });

      weatherPerDay.appendChild(dayBlock);
    });
    
    
    // Load today’s data immediately on page load
    document.querySelector('.day-block.active-day').click();
  })
  .catch(error => console.error('Error fetching data:', error));
    
}








// Helper: get day name
function getDayName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Helper: get weather icon from code
function getWeatherIcon(code) {
  // simple icons for demo
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 61, 80].includes(code)) return '🌦️';
  if ([63, 65, 81, 82].includes(code)) return '🌧️';
  if ([71, 73, 75].includes(code)) return '❄️';
  if (code === 95) return '⛈️';
  return '🌈';
}
