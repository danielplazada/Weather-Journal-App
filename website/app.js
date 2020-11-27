
const website_url = 'http://api.openweathermap.org/data/2.5/weather?q=';
const country = 'se';
const API_key = '4be216015255737f1960ad676d0b2228';
const Server_URL = 'http://localhost:3000';


document.getElementById('generate').addEventListener('click', performAction);


function performAction(e) {
  const city = document.getElementById('city').value;
  const feelings = document.getElementById('feelings').value;
  get_Data_Weather(city, feelings);
}

const get_Data_Weather = async (city, feelings) => {

  const res =
    fetch(`${website_url}${city},${country}=&APPID=${API_key}`) // GET
      .then(response => response.json())
      .then(data => {
        // Add data
        const tempKelvin = data.main.temp;
        const d = new Date();
        const formattedDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
        return data_Post(`${Server_URL}/addData`, { // POST
          date: formattedDate,
          temperature: tempKelvin,
          feelings: feelings,
        });
      })
      .then(() => fetch(`${Server_URL}/all`)) // GET returns the fetch promise
      .then(response => response.json())
      .then(allData => {
        const data = allData[allData.length - 1];
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = temp_form(data.temperature);
        document.getElementById('content').innerHTML = data.feelings;
      });
}
function data_Post(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
function temp_form(tempKelvin) {
  const temp_celcius = tempKelvin - 273.15;
  const temp_fahrenheit = temp_celcius * (9/5) + 32;
  return `${temp_celcius.toFixed(0)}C / ${temp_fahrenheit.toFixed(1)} F`;
}
  