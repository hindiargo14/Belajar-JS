const apiKey = 'd27bcbfdcaa092c8f406b0b0468ac93b'; // Ganti dengan API Key OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchButton').addEventListener('click', async () => {
  const city = document.getElementById('cityDropdown').value;
  if (!city) {
    alert('Pilih kota terlebih dahulu!');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Kota tidak ditemukan');

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
});

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.classList.remove('hidden');
  weatherResult.innerHTML = `
    <h2><i class="fas fa-map-marker-alt"></i> ${name}</h2>
    <p><i class="fas fa-cloud"></i> ${weather[0].description}</p>
    <p><i class="fas fa-temperature-high"></i> Suhu: ${main.temp}°C</p>
    <p><i class="fas fa-tint"></i> Kelembapan: ${main.humidity}%</p>
  `;
}
