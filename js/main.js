import showWather from './utils.js'
// checkWeather()

/*
* ===== Кнопка поиска
*/
let searcherBtn = document.querySelector('.search_btn')
searcherBtn.onclick = () => {
    showWather()
}

/*
* ===== Поиск по энтеру
*/
let searchField = document.querySelector('#searchField')
searchField.addEventListener('keypress', function(event){
    if (event.keyCode == 13) {
        event.preventDefault(); // отменяем обновление
        showWather()
    }
})