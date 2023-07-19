let citi = 'Москва'
let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'

let searcherBtn = document.querySelector('.search_btn')

async function checkWeather() {
    const response = await fetch(url)
    let data = await response.json()
    
    console.log(data)

    document.querySelector('.citi').innerHTML = citi
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C'
    document.querySelector('.weather__details__description__txt').innerHTML = data.weather[0].description
    document.querySelector('.weather__details__wind__txt').innerHTML = data.wind.speed + ' м/с'

    let icon = data.weather[0].main
    document.querySelector('.weather__details__description__icon').src=`img/${icon}.gif`

    // // Координаты
    // let lat = data.coord.lat
    // let lon = data.coord.lon

    // // Прогноз
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2e86a32f9d29e13d3916a7ca8be036ad`)
    // let forecastData = await res.json()

    // console.log(forecastData)
}

checkWeather()

searcherBtn.onclick = () => {
    citi = document.querySelector('#citi').value
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'
    checkWeather()
    document.querySelector('#citi').value = ''
}