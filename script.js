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