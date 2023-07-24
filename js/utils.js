let citi = 'Демидов'
let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'


async function checkWeather() {
    /*
    *---------- main temp
    *--------------------
    */
    const response = await fetch(url)
    let data = await response.json()
    
    console.log(data)

    document.querySelector('.citi').innerHTML = citi
    document.querySelector('.weather__temp').innerHTML = Math.round(data.main.temp) + '°C'
    let icon = data.weather[0].main
    document.querySelector('#description-icon').src=`img/${icon}.png`
    document.querySelector('.weather__description-txt').innerHTML = data.weather[0].description
    document.querySelector('.weather__description-feels').innerHTML = `Ощущается как ${data.main.feels_like} °C`
    document.querySelector('.detalis__wind__txt').innerHTML = `Скорость ветра ${data.wind.speed} м/с`
    document.querySelector('.detalis__humidity__txt').innerHTML = `Влажность ${data.main.humidity} %`


    /*
    *---------- forecast / прогноз
    *--------------------
    */
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad`)
    let dataForecast = await responseForecast.json()

    console.log(dataForecast)

    let количествоЗначенийМассива = dataForecast.list.length

    let main = document.querySelector('.main')
    let секцияПрогноз = document.querySelector('.forecast')
    
    секцияПрогноз.remove()

    секцияПрогноз = document.createElement('section')
    секцияПрогноз.classList = 'forecast'
    main.append(секцияПрогноз)

    // Создаем карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {   
        let карточкаПрогноз = document.createElement('div')
        карточкаПрогноз.className = 'forecast__card'
        карточкаПрогноз.dataset.id = index
        секцияПрогноз.append(карточкаПрогноз)
    }

    // Сдесь должен быть день недели
    // <p class="forecast__card__day">Воскреенье</p> 

    // Добавляем время в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let карточкаПрогнозВремя = document.createElement('p')
        карточкаПрогнозВремя.className = 'forecast__card__time'
        карточкаПрогнозВремя.innerHTML = dataForecast.list[index].dt_txt
        
        поискКарточкиПрогноза.append(карточкаПрогнозВремя)
    }
    
    // Добавляем температуру в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let карточкаПрогнозТемпература = document.createElement('p')
        карточкаПрогнозТемпература.className = 'forecast__card__temp'
        карточкаПрогнозТемпература.innerHTML = `${dataForecast.list[index].main.temp}  °C`
        
        поискКарточкиПрогноза.append(карточкаПрогнозТемпература)
    }

    // Сдесь должна быть картинка
    /** <div class="forecast__card__imgDescription">
            <img src="img/Clear.png" alt="солнце" class="forecast__card__imgDescription__img">
        </div>
     */

    // Добавляем описание погоды в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let карточкаПрогнозОписаниеПогоды = document.createElement('p')
        карточкаПрогнозОписаниеПогоды.className = 'forecast__card__description'
        карточкаПрогнозОписаниеПогоды.innerHTML = dataForecast.list[index].weather[0].description
        
        поискКарточкиПрогноза.append(карточкаПрогнозОписаниеПогоды)
    }

    // Сдесь должен быть ветер
    /** <div class="forecast__card__wind">
            <img class="forecast__card__wind__img" src="img/wind.png" alt="Скорость ветра">
            <p class="forecast__card__wind__speed">3 м/с</p>
        </div>
     */

    // Сдесь должна быть влажность
    /** <div class="forecast__card__humidity">
            <img class="forecast__card__humidity__img" src="img/humidity.png" alt="Влажность">
            <p class="forecast__card__wind__speed">70 %</p>
        </div>
     */            
}

function startShowWather () {
    checkWeather()
}

function showWather (){
    citi = document.querySelector('#searchField').value
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'
    checkWeather()
    document.querySelector('#searchField').value = ''
}

export  {
    startShowWather, 
    showWather
}