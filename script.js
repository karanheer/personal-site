// Global variables
const WEATHER_API_KEY = 'fdb9a5dcd8d642f7e7a76c488c363485'; // Replace with your actual API key
const CITY = 'mumbai';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${WEATHER_API_KEY}`;

// Function to update the time display with seconds
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    document.querySelector('.time').textContent = `${hours}:${minutes}:${seconds}${ampm}`;
    
    // Update every second
    setTimeout(updateTime, 1000);
}

// Function to update the weather display
async function updateWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        document.querySelector('.location').textContent = `${CITY}, ${temp}°C`;
        
        // Update weather every 30 minutes
        setTimeout(updateWeather, 30 * 60 * 1000);
    } catch (error) {
        console.error('Error updating weather:', error);
        // Try again after 5 minutes if there was an error
        setTimeout(updateWeather, 5 * 60 * 1000);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start updating time
    updateTime();
    
    // Start updating weather
    updateWeather();
});