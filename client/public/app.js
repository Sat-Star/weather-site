const serverUrl = 'http://localhost:3000';
document.addEventListener('DOMContentLoaded', function () {
    const weatherForm = document.getElementById('weatherForm');
    weatherForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitCity();
    });
})
const url = 'https://api.weatherapi.com/v1/';
let city = 'New Delhi';
let currentTemp = document.getElementById('temperature');
let currentTime = document.getElementById('time-date');
let properURL = `${serverUrl}/weather?city=${city}`;

fetchTemperature();

function fetchTemperature() {
    fetch(properURL, {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => {
            if (!response) {
                throw new Error("No data");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.location.name);
            document.getElementById('city').innerHTML = `${data.location.name}`;
            currentTemp.innerHTML = `${data.current.temp_c}°C, ${data.current.condition.text} <img src="${data.current.condition.icon}" alt="png">`;
            fetchTime(data);

            let day1 = document.getElementById('day1');
            let day2 = document.getElementById('day2');
            let day3 = document.getElementById('day3');
            day1.innerHTML = `<b>Day 1:</b><br><br>Max: ${data.forecast.forecastday[1].day.maxtemp_c}°C<br>Min: ${data.forecast.forecastday[1].day.mintemp_c}°C
            <img src="${data.forecast.forecastday[1].day.condition.icon}">`;
            day2.innerHTML = `<b>Day 2:</b><br><br>Max: ${data.forecast.forecastday[2].day.maxtemp_c}°C<br>Min: ${data.forecast.forecastday[2].day.mintemp_c}°C
            <img src="${data.forecast.forecastday[2].day.condition.icon}">`;
            day3.innerHTML = `<b>Day 3:</b><br><br>Max: ${data.forecast.forecastday[3].day.maxtemp_c}°C<br>Min: ${data.forecast.forecastday[3].day.mintemp_c}°C
            <img src="${data.forecast.forecastday[3].day.condition.icon}">`;
        })
        .catch(error => {
            alert(`City spelling wrong or does not exist`);
            console.error('Error fetching current temperature:', error);
        });
}

function fetchTime(data) {
    let timeData = data.location.localtime;
    let showTime = timeData.substring(11);
    let showYear = timeData.substring(0, 4);
    let showDate = timeData.substring(8, 10);
    let monthNum = timeData.substring(5, 7);
    let showMonth;
    if (monthNum == '01') showMonth = 'January';
    if (monthNum == '02') showMonth = 'February';
    if (monthNum == '03') showMonth = 'March';
    if (monthNum == '04') showMonth = 'April';
    if (monthNum == '05') showMonth = 'May';
    if (monthNum == '06') showMonth = 'June';
    if (monthNum == '07') showMonth = 'July';
    if (monthNum == '08') showMonth = 'August';
    if (monthNum == '09') showMonth = 'September';
    if (monthNum == '10') showMonth = 'October';
    if (monthNum == '11') showMonth = 'November';
    if (monthNum == '12') showMonth = 'December';
    currentTime.innerHTML = `${showMonth} ${showDate}, ${showYear} | ${showTime} Hours`;
}

function submitCity() {
    city = document.getElementById('cityInput').value;
    properURL = `${serverUrl}/weather?city=${city}`;

    fetchTemperature();
}

setInterval(() => {
    fetchTemperature();
}, 60000);

