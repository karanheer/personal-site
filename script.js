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



////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////

const accessToken = "BQDVYBbYlKVdWu2FUpkafjrBADYuoeXQA7nUhmHvq_q3k9LZM493GIqpjjDUKcwvY5d0PFdN5j39pr8d99IgZYUKyYt4gzX9o26DkLsIS3fwKykRxwcztQMb9AiBtUvCG9pch-sNqidXFz4gCEXrXaRoJYBthKHNpPISAeCNkFFIGeAi7qisrMEF6KXXGK_Qs9QTnSNB94mZPEdlQV0iR1iPbUeSgrVv0011G3Hjnpo&token_type=Bearer&expires_in=3600";

async function fetchCurrentlyPlaying() {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (response.status === 204 || response.status === 200 && !(await response.json()).is_playing) {
            await fetchLastPlayed();
            return;
        }

        const data = await response.json();
        updateWidget(data);
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
    }
}

async function fetchLastPlayed() {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        const data = await response.json();
        if (data.items.length > 0) {
            updateWidget(data.items[0].track);
        }
    } catch (error) {
        console.error("Error fetching last played track:", error);
    }
}

function updateWidget(track) {
    document.getElementById("song-name").textContent = track.name;
    document.getElementById("artist-name").textContent = track.artists.map(a => a.name).join(", ");
    document.getElementById("album-cover").src = track.album.images[0]?.url || "";
    document.getElementById("total-time").textContent = formatTime(track.duration_ms);
    
    if (track.progress_ms) {
        updateProgress(track.progress_ms, track.duration_ms);
    }
}

function updateProgress(progress, duration) {
    const progressBar = document.getElementById("progress-bar");
    progressBar.max = duration;
    progressBar.value = progress;

    document.getElementById("current-time").textContent = formatTime(progress);

    setInterval(() => {
        progress += 1000;
        if (progress < duration) {
            progressBar.value = progress;
            document.getElementById("current-time").textContent = formatTime(progress);
        }
    }, 1000);
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

setInterval(fetchCurrentlyPlaying, 5000);
fetchCurrentlyPlaying();
