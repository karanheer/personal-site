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







//dark mode ting

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Check if user has a preference stored
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
}

toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save theme preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙";
    }
});



//spotify ting

const accessToken = "BQDVYBbYlKVdWu2FUpkafjrBADYuoeXQA7nUhmHvq_q3k9LZM493GIqpjjDUKcwvY5d0PFdN5j39pr8d99IgZYUKyYt4gzX9o26DkLsIS3fwKykRxwcztQMb9AiBtUvCG9pch-sNqidXFz4gCEXrXaRoJYBthKHNpPISAeCNkFFIGeAi7qisrMEF6KXXGK_Qs9QTnSNB94mZPEdlQV0iR1iPbUeSgrVv0011G3Hjnpo&token_type=Bearer&expires_in=3600"; // Replace with your actual access token

async function fetchCurrentlyPlaying() {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: { "Authorization": `Bearer ${accessToken}` }
    });

    if (response.status === 200) {
        const data = await response.json();
        if (data.item) {
            const track = data.item;
            const trackName = track.name;
            const artistName = track.artists.map(artist => artist.name).join(", ");
            const albumImage = track.album.images[0].url;

            document.getElementById("track-info").innerHTML = `
                <p><strong>${trackName}</strong> by ${artistName}</p>
                <img src="${albumImage}" width="200" style="border-radius:10px;">
            `;
        } else {
            document.getElementById("track-info").innerText = "No track currently playing.";
        }
    } else {
        document.getElementById("track-info").innerText = "Unable to fetch track. Check token.";
    }
}

fetchCurrentlyPlaying(); // Run once on load
setInterval(fetchCurrentlyPlaying, 10000); // Update every 10 sec
