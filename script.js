// OpenWeatherMap API Key (Replace 'YOUR_API_KEY' with your actual API key)
const apiKey = 'fdb9a5dcd8d642f7e7a76c488c363485';
const city = 'Mumbai';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

// Fetch real-time weather for Mumbai
async function fetchWeather() {
    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
            throw new Error('Weather API error');
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        document.getElementById('weather-info').textContent = `${city} ${temperature}°C`;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather-info').textContent = `${city} Weather Unavailable`;
    }
}

// Update Mumbai time
function updateTime() {
    const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
      //  second: '2-digit'
    };
    const timeString = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('time-info').textContent = `${timeString} IST`;
}

// Run functions
fetchWeather(); // Get weather on page load
updateTime(); // Get time on page load
setInterval(updateTime, 1000); // Update time every second
setInterval(fetchWeather, 600000); // Refresh weather every 10 minutes



document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});
