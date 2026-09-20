// Replace with your actual OpenWeatherMap API Key and location coordinates
const apiKey = '77e4c25bc53913ca5487140d7de118c7';
const lat = '6.6018'; // Magodo / Lagos coordinates
const lon = '3.3800';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// 1. Fetch Current Weather & 3-Day Forecast
async function fetchWeather() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (currentRes.ok && forecastRes.ok) {
            const currentData = await currentRes.json();
            const forecastData = await forecastRes.json();
            displayCurrentWeather(currentData);
            displayForecast(forecastData);
        } else {
            throw new Error('Weather API fetch failed');
        }
    } catch (error) {
        console.error('Weather error:', error);
        document.getElementById('current-weather').innerHTML = '<p>Unable to load weather data.</p>';
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = `
        <div class="weather-info">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
            <div>
                <p><strong>${temp}°C</strong></p>
                <p style="text-transform: capitalize;">${desc}</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    // Filter forecast items taken roughly around 12:00 PM for the next 3 days
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temp}°C</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

// 2. Member Spotlights (Silver & Gold Members Only)
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Spotlight fetch error:', error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    // Filter for Gold (3) and Silver (2) members only
    const qualifiedMembers = members.filter(m => m.membership === 2 || m.membership === 3);

    // Shuffle array and select 2 to 3 members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const levelText = member.membership === 3 ? 'Gold Member' : 'Silver Member';
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p><strong>Level:</strong> ${levelText}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

// Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

// Footer Metadata
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Initialize
fetchWeather();
fetchSpotlights();