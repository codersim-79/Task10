function getWeather() {

    const city = document.getElementById("city").value;
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const location = document.getElementById("location");
    const temperature = document.getElementById("temperature");
    const windspeed = document.getElementById("windspeed");

    // Reset
    error.textContent = "";
    location.textContent = "";
    temperature.textContent = "";
    windspeed.textContent = "";

    if (city === "") {
        error.textContent = "Please enter a city name 🌍";
        return;
    }
    // comments for my understanding
    loading.textContent = "Fetching weather... ⏳";

    // Step 1: Convert city → latitude & longitude
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json())
        .then(data => {

            if (!data.results) {
                throw new Error("City not found");
            }

            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;

            // Step 2: Fetch weather using lat & lon
            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );// Internet se data laata hai .fatch(url)
        })
        .then(res => res.json()) //JSON ko JS object me convert karta hai 
        .then(weatherData => {

            const temp = weatherData.current_weather.temperature;
            const wind = weatherData.current_weather.windspeed;

            location.textContent = city.toUpperCase();
            temperature.textContent = `🌡 Temperature: ${temp}°C`;
            windspeed.textContent = `💨 Wind Speed: ${wind} km/h`;

            loading.textContent = "";
        })
        .catch(err => {
            loading.textContent = "";
            error.textContent = "Unable to fetch weather 😢";
            console.log(err);
        });
}