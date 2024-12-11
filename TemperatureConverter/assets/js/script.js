// Fetch and display live temperature and update background
async function fetchLiveTemperature(city = 'Batam') {
    try {
        // Map city names to coordinates
        const cities = {
            'Batam': { latitude: 1.0456, longitude: 104.0305 },
            'Bandung': { latitude: -6.9147, longitude: 107.6098 },
            'Jakarta': { latitude: -6.2088, longitude: 106.8456 },
            'Jayapura': { latitude: -2.5337, longitude: 140.7181 },
            'Maluku': { latitude: -3.2385, longitude: 130.1453 }
        };

        const { latitude, longitude } = cities[city];
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        const temperature = data.current_weather.temperature;

        document.getElementById('liveTemperature').textContent = `Current Temp in ${city}: ${temperature}°C`;
        updateBackgroundColor(temperature);
    } catch (error) {
        document.getElementById('liveTemperature').textContent = 'Unable to fetch temperature.';
    }
}

// Update background color based on temperature
function updateBackgroundColor(temperature) {
    const body = document.body;
    let color;

    if (temperature <= 0) {
        color = 'linear-gradient(135deg, #0000ff, #00f5ff)'; // Cold
    } else if (temperature > 0 && temperature <= 20) {
        color = 'linear-gradient(135deg, #00f5ff, #00ff00)'; // Cool
    } else if (temperature > 20 && temperature <= 30) {
        color = 'linear-gradient(135deg, #00ff00, #ffff00)'; // Warm
    } else {
        color = 'linear-gradient(135deg, #ff9900, #ff0000)'; // Hot
    }

    body.style.background = color;
}

// Convert temperatures live
function convertTemperature() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    
    let celsius = '-', fahrenheit = '-', kelvin = '-';

    if (!isNaN(inputValue)) {
        if (inputUnit === 'celsius') {
            celsius = inputValue;
            fahrenheit = (celsius * 9/5) + 32;
            kelvin = celsius + 273.15;
        } else if (inputUnit === 'fahrenheit') {
            fahrenheit = inputValue;
            celsius = (fahrenheit - 32) * 5/9;
            kelvin = celsius + 273.15;
        } else if (inputUnit === 'kelvin') {
            kelvin = inputValue;
            celsius = kelvin - 273.15;
            fahrenheit = (celsius * 9/5) + 32;
        }

        document.getElementById('celsiusValue').textContent = celsius.toFixed(2);
        document.getElementById('fahrenheitValue').textContent = fahrenheit.toFixed(2);
        document.getElementById('kelvinValue').textContent = kelvin.toFixed(2);
    } else {
        document.getElementById('celsiusValue').textContent = '-';
        document.getElementById('fahrenheitValue').textContent = '-';
        document.getElementById('kelvinValue').textContent = '-';
    }
}

// Handle city selection
function updateCity() {
    const city = document.getElementById('citySelect').value;
    fetchLiveTemperature(city);
}

// Event Listeners
document.getElementById('inputValue').addEventListener('input', convertTemperature);
document.getElementById('inputUnit').addEventListener('change', convertTemperature);
document.getElementById('citySelect').addEventListener('change', updateCity);

// Initialize
fetchLiveTemperature();
