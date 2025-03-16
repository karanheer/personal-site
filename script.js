// Update the time display
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Add leading zeros to minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = hours + ':' + minutes + ampm;
    document.querySelector('.time').textContent = timeString;
}

// Call updateTime immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Fetch current weather data for Mumbai
// This is a simplified version - in a real app, you would use an actual weather API
function fetchWeather() {
    // This would be replaced with an actual API call
    // For demonstration purposes, we're just using the temperature from the design
    const temperature = '25°C';
    document.querySelector('.location').textContent = 'mumbai, ' + temperature;
}

// Initialize website functions
document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
    
    // Add hover effect for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        item.addEventListener('click', function() {
            // Add project viewing functionality here
            console.log('Project clicked');
        });
    });
});