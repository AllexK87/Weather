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
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let val = dataForecast.list[index].dt_txt;

        let valYear = val.substring(0, 4)
        let valMonth = val.substring(5, 7) - 1
        let valDay = val.substring(8, 10)

        let date = new Date(valYear, valMonth, valDay)

        let dayWeek = getWeekDay(date)
        
        let деньНедели = document.createElement('p')
        деньНедели.className = 'forecast__card__day'
        деньНедели.innerHTML = dayWeek
        
        поискКарточкиПрогноза.append(деньНедели)
    }

    // Добавляем время в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)

        let val = dataForecast.list[index].dt_txt;

        let valTime = val.substring(11, 16)
        
        let карточкаПрогнозВремя = document.createElement('p')
        карточкаПрогнозВремя.className = 'forecast__card__time'
        карточкаПрогнозВремя.innerHTML = valTime
        
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

    // Добавляем картинку в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let карточкаПрогнозКартинка = document.createElement('img')
        карточкаПрогнозКартинка.className = 'forecast__card__imgDescription'
        let icon = dataForecast.list[index].weather[0].main
        карточкаПрогнозКартинка.src = `img/${icon}.png`
        
        поискКарточкиПрогноза.append(карточкаПрогнозКартинка)
    }


    // Добавляем описание погоды в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let карточкаПрогнозОписаниеПогоды = document.createElement('p')
        карточкаПрогнозОписаниеПогоды.className = 'forecast__card__description'
        карточкаПрогнозОписаниеПогоды.innerHTML = dataForecast.list[index].weather[0].description
        
        поискКарточкиПрогноза.append(карточкаПрогнозОписаниеПогоды)
    }

    // Добавляем скорость ветра в карточку прогноза
    for (let index = 0; index < количествоЗначенийМассива; index++) {
        let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
        
        let ветер = document.createElement('div')
        ветер.className = 'forecast__card__wind'
        
        let ветерКартинка = document.createElement('img')
        ветерКартинка.className = 'forecast__card__wind__img'
        ветерКартинка.src = 'img/wind.png'
        ветерКартинка.alt = "Скорость ветра"

        let ветерСкорость = document.createElement('p')
        ветерСкорость.className = 'forecast__card__wind__speed'
        ветерСкорость.innerHTML = `${dataForecast.list[index].wind.speed} м/с`

        поискКарточкиПрогноза.append(ветер)
        ветер.append(ветерКартинка)
        ветер.append(ветерСкорость)
    }

    // Добавляем процент влажности в карточку прогноза
        for (let index = 0; index < количествоЗначенийМассива; index++) {
            let поискКарточкиПрогноза = document.querySelector(`[data-id = "${index}"]`)
            
            let влажность = document.createElement('div')
            влажность.className = 'forecast__card__humidity'
            
            let влажностьКартинка = document.createElement('img')
            влажностьКартинка.className = 'forecast__card__humidity__img'
            влажностьКартинка.src = 'img/humidity.png'
            влажностьКартинка.alt = "Влажность"
    
            let влажностьЗначение = document.createElement('p')
            влажностьЗначение.className = 'forecast__card__wind__speed'
            влажностьЗначение.innerHTML = `${dataForecast.list[index].main.humidity} %`
    
            поискКарточкиПрогноза.append(влажность)
            влажность.append(влажностьКартинка)
            влажность.append(влажностьЗначение)
        }          
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

function getWeekDay (date) {
    let days = ['Воскресенье', 
                'Понедельник', 
                'Вторник', 
                'Среда', 
                'Четверг', 
                'Пятница', 
                'Суббота'];
    return days[date.getDay()]
}

export  {
    startShowWather, 
    showWather
}