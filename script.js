const temp=document.getElementById("temp");
const dateTemp=document.getElementById("dateTemp");
const hum=document.getElementById("hum");
const wind=document.getElementById("vent");
const cloud=document.getElementById("nuage");
const ville=document.getElementById("ville");

function initialiser(){ // hides all animated layers (clouds, rain, sun…)
    document.querySelector(".snowy").style.display = "none";
    document.querySelector(".sunny").style.display = "none";
    document.querySelector(".clear-night").style.display = "none";
    document.querySelector(".partly-cloudy").style.display = "none";
    document.querySelector(".cloudy").style.display = "none";
    document.querySelector(".rainy").style.display = "none";
}

function WeatherComment(weather){
    console.log("ahawaa : ",weather)
    const com=document.getElementById('WeatherComment');
    if (weather=="sunny" || weather=="partly-cloudy"){
        com.textContent="Today’s weather is looking great. The sky will stay mostly clear, giving you plenty of sunlight and a bright atmosphere throughout the day. It’s a perfect opportunity to spend time outside, whether you’re going for a walk, meeting friends, or just enjoying fresh air. No need to worry about rain — dress comfortably and make the most of it";
    }
    else if(weather=="cloudy"){
        com.textContent="The sky is completely covered with clouds today, creating a calm but slightly dull atmosphere. Even though there won’t be much sunshine, temperatures should stay stable and comfortable. It’s a great day for indoor activities or for a relaxed walk if you prefer cooler weather. No major weather risks expected.";
    }
    else if(weather=="foggy"){
        com.textContent="Visibility is quite low due to fog, so it’s important to be cautious, especially when driving or walking near traffic. The air may feel humid and slightly cold, so wearing something warm is recommended. As the day progresses, visibility should slowly improve. Take your time outdoors and stay alert.";
    }
    else if(weather=="rainy"){
        com.textContent="It’s going to be a rainy day, with periods of steady rain or passing showers. Make sure to take an umbrella or raincoat if you’re heading out. The humidity will be higher than usual, and the ground may become slippery, so watch your step. Outdoor plans might need some adjustment, but it’s a perfect day for staying cozy indoors."
    }
    else if(weather=="snowy"){
        com.textContent="Snow is expected today, which may create a beautiful but cold atmosphere. Make sure to dress warmly and wear proper shoes, as sidewalks can become slippery very quickly. Visibility might drop during heavier snow periods, especially in the evening. If you’re going out, take your time and enjoy the scenery while staying safe."
    }
    else{
        com.textContent="Thunderstorms are forecasted today, which means strong rain, lightning, and possibly hail. Try to avoid staying outdoors for long periods, especially in open areas. If possible, keep travel minimal and stay indoors when the storm peaks. Make sure to secure any outdoor objects at home, as sudden strong winds may occur."
    }
}

function WeatherAnimation(weather) {
    console.log(weather)
    const hour=(document.getElementById("dateTemp").textContent).split(':')[0];
    const isDay = hour >= 7 && hour < 18;
    if(!isDay && (weather=="sunny" || weather=="partly-cloudy")){
        weather="clear-night"
    }
    console.log(isDay)
    console.log(weather)
    // 1. Hide all animation overlays
    document.querySelectorAll('.weather-overlay').forEach(div => {
        div.style.opacity = 0;
    });

    // 2. Show the correct animation overlay
    const overlay = document.querySelector(`.${weather}.weather-overlay`);
    if (overlay) overlay.style.opacity = 1;

    // 3. Apply ONLY the background class to body (safe & clean)
    document.body.classList.remove('bg-sunny', 'bg-partly-cloudy', 'bg-cloudy', 'bg-rainy', 'bg-snowy', 'bg-clear-night');
    if(!isDay){
        weather="clear-night";
    }
    document.body.classList.add(`bg-${weather}`);


}
function defaultWeather() {
    alert("Location denied");
    LoadData(36.8065,10.1815,0);
    ville.textContent="Tunis";

}

CurrentLocation()
function CurrentLocation(){
    navigator.geolocation.getCurrentPosition(pos => {
    const curlat = pos.coords.latitude;
    const curlon = pos.coords.longitude;
    console.log(curlat);
    console.log(curlon);
    LoadData(curlat,curlon,1)
}, () => defaultWeather());;
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
    const weather1 = block.querySelectorAll('.hid')[3].textContent;

    // update the details div (you can style this as you want)
    temp.textContent=temp1;
    dateTemp.textContent=time1;
    hum.textContent=hum1;
    wind.textContent=wind1;
    cloud.textContent=cloud1;
    WeatherAnimation(weather1);
  });
}

// Loop through each block and add the click event
//document.addEventListener('DOMContentLoaded', WeatherAnimation())



const lat = 36.8065; // Example: Tunis
const long = 10.1815;


function LoadData(latitude,longitude,x){
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
        icon: hourly.weathercode.map(code => getWeatherIcon(code)),
        weather_name: hourly.weathercode.map(code => mapWeatherCodeToChar(code))
        };

        const dailyData = daily.time.map((time, i) => ({
        date: time,
        name: getDayName(time),
        minTemp: daily.temperature_2m_min[i],
        maxTemp: daily.temperature_2m_max[i],
        icon: getWeatherIcon(daily.weathercode[i]),
        weather_name: mapWeatherCodeToChar(daily.weathercode[i])
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
            <div class="hid1">${day.weather_name}</div>
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

            //add the comment section
            com =dayBlock.getElementsByClassName('hid1')[0].textContent;
            WeatherComment(com);


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
                weather: hourlyData.weather_name[idx],
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
                weather: hourlyData.weather_name[start + i],
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
                <div class="hid">${h.weather}</div>
            `;
            weatherPerHour.appendChild(block);
            });
            const BlockHour=container.querySelectorAll('.hour-block')[0];
            const time1 = BlockHour.querySelector('.time').textContent;
            const temp1 = BlockHour.querySelector('.temp').textContent;
            const hum1 = BlockHour.querySelectorAll('.hid')[0].textContent;
            const wind1 = BlockHour.querySelectorAll('.hid')[1].textContent;
            const cloud1 = BlockHour.querySelectorAll('.hid')[2].textContent;
            const weather = BlockHour.querySelectorAll('.hid')[3].textContent;
            temp.textContent=temp1;
            dateTemp.textContent=time1;
            hum.textContent=hum1;
            wind.textContent=wind1;
            cloud.textContent=cloud1;
            if(x==1){
                ville.textContent="Current Location"
            }
            WeatherAnimation(weather)

            document.getElementById('loading-text')?.classList.remove('visible');
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
// Helper: get weather
function mapWeatherCodeToChar(code) {
    if (code === 0 || code === 1) return "sunny";
    if (code === 2) return "partly-cloudy";
    if (code === 3) return "cloudy";

    if (code === 45 || code === 48) return "foggy";

    if ([61,63,65].includes(code) || [51,53,55].includes(code) || [56,57].includes(code) || [66,67].includes(code)) return "rainy";

    if ([71,73,75].includes(code) || code === 77 || [85,86].includes(code)) return "snow";

    if ([95,96,99].includes(code) || [80,81,82].includes(code)) return "thunderstorm";

    return "unknown";
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

// Location selector (clean & simple)
document.getElementById('search-city').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (!city) return;

    // Show loading again
    document.getElementById('loading-text')?.classList.add('visible');

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`)
        .then(r => r.json())
        .then(d => {
            if (d[0]) {
                document.getElementById('ville').textContent=city;
                document.querySelector('.WeatherPerDay').innerHTML = '';
                document.querySelector('.WeatherPerHour').innerHTML = '';
                LoadData(d[0].lat, d[0].lon,0);
            } else {
                alert("City not found");
                document.getElementById('loading-text')?.classList.remove('visible');
            }
        })
        .catch(() => {
            alert("Error searching city");
            document.getElementById('loading-text')?.classList.remove('visible');
        });
});

document.getElementById('my-location').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(p => {
        document.querySelector('.WeatherPerDay').innerHTML = '';
        document.querySelector('.WeatherPerHour').innerHTML = '';
        document.getElementById('loading-text')?.classList.add('visible');
        LoadData(p.coords.latitude, p.coords.longitude,1);
    }, () => alert("Location denied"));
});

document.getElementById('pick-on-map').addEventListener('click', () => {
    window.open('https://www.openstreetmap.org', '_blank');
    setTimeout(() => alert("Right-click anywhere on the map → copy coordinates → come back and type the city name"), 500);
});

// Show loading indicator as soon as the page starts
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading-text')?.classList.add('visible');
});






