function getWeather() {
    const apiKey ='0a3fc30182caf468abd1325dae1afa6d';
    const location = document.getElementById('location').value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherDiv = document.getElementById('weather');
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const clouds = data.clouds.all;
        const windSpeed = data.wind.speed;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');
        const city = data.name;

        weatherDiv.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Cloudiness: ${clouds}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;

        // Call function to fetch and display forecast
        getForecast(location);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = 'Error fetching weather data. Please try again.';
    });
}

function getForecast(location) {
    const apiKey = '0a3fc30182caf468abd1325dae1afa6d';
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '<h2>Next 7 Days Forecast</h2>';
        const labels = [];
        const temperatures = [];

        for (let i = 0; i < data.list.length; i++) {
            if (i % 8 === 0) {
                const date = new Date(data.list[i].dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                const temperature = data.list[i].main.temp;
                labels.push(day);
                temperatures.push(temperature);
            }
        }

        // Clear previous chart if exists
        const existingChart = document.getElementById('chart');
        if (existingChart) {
            existingChart.parentNode.removeChild(existingChart);
        }

        // Create a new canvas element for the chart
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'chart');
        forecastDiv.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching forecast data:', error);
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = 'Error fetching forecast data. Please try again.';
    });
}

function getWeatherForCity(cityId) {
    const apiKey = '0a3fc30182caf468abd1325dae1afa6d';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const cityCard = document.getElementById(cityId);
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const clouds = data.clouds.all;
        const windSpeed = data.wind.speed;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');
        const cityName = data.name;

        cityCard.innerHTML = `
            <h3>${cityName}</h3>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Cloudiness: ${clouds}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    })
    .catch(error => {
        console.error(`Error fetching weather data for ${cityId}:`, error);
        const cityCard = document.getElementById(cityId);
        cityCard.innerHTML = `Error fetching weather data for ${cityId}. Please try again.`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const cities = [
        'Lucknow',
        'Delhi',
        'Kanpur',
        'Varanasi'
    ];
    
    cities.forEach(cityId => {
        getWeatherForCity(cityId);
    });

    // Call function to get weather for the first city in the list by default
    getWeather();
});
