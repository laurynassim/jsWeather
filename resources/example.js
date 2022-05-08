let apiKey = 'b233735abfc7edf3a9a9f7b33ad81491' 
let lang = 'lt' // kalba
let units = 'metric' // naudojama metrine sistema
let city = '' // miestas irasytas inpute

let cityName = document.getElementById('city')
let searchButton = document.getElementById('search')

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener('click', getDataFromApi)

// funkcija kuri gauna duomenis is API
function getDataFromApi() {
    // paimu irasyta miesta is input ir nustatau
    city = cityName.value

    // url yra skirtas pasiimti duomenis is api
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city +
        '&units=' + units +
        '&lang=' + lang +
        '&appid=' + apiKey

    // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
    fetch(url)
        .then(response => response.json())
        // data => jusu kodas
        .then(function (data) {
            //paduodu gautus duomenis i funkcija
            showWeatherInDom(data)
        });
}

// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
    // tikrinu ar mano response yra geras
    
    if (data.cod === '200') {
        let displayLocation = document.getElementById("locationName")
        let temp = document.getElementById("temp")
        let feelTemp = document.getElementById('feelTemp')
        
        
        displayLocation.innerHTML = data.city.name +':' + ' '  + data.city.population + ' ' + 'residents'
        temp.innerHTML = 'current temperature is:' + ' ' + data.list[0].main.temp + 'C'
        feelTemp.innerHTML = 'feels like' + ' ' + data.list[0].main.feels_like + 'C'
        
        
        let  iconCode = data.list[0].weather[0].icon
        let icon = document.getElementById('icon')
        let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
        icon.src = iconUrl        

        // data tai duomenys, kuriuos mes padavem i funkcija
        // cia atvaizduojam gautus duomenis DOM'e

        // sekantys zingsniai:
        // 1. susikurti div
        // 2. susirinkti is objekto reikiamus duomenis pavyzdiui:
        // miesto pavadinima, laika, oro apibudinima (description)
        //  temperatura min, max

        // cia nustatom icon code is gautu duomenu, kad nustatyi iconCode pirma reikes gautame
        // objekte susirasti icon
        // let iconCode = '';
        // let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'

        console.log(data)
    } else {
        alert('kazkas negerai, patikrinti konsole')
        console.log('Kazkas negerai',data)
    }

}
