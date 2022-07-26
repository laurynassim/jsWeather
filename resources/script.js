

let apiKey = 'b233735abfc7edf3a9a9f7b33ad81491' 
let lang = 'en' // kalba
let units = 'metric' // naudojama metrine sistema
let city = '' // miestas irasytas inpute
document.getElementById('city').value = localStorage.getItem('city')
let cityName = document.getElementById('city')
let searchButton = document.getElementById('search')
let mainSection = document.getElementById('main')
let video = document.getElementById('video')
let langList = document.getElementById('languageSelect')

langList.value = localStorage.getItem('lang')
langList.addEventListener('change', function(){
    lang = this.value
    localStorage.setItem('lang', this.value) 
});
let unitsList = document.getElementById('unitsSelect')
unitsList.value = localStorage.getItem('units')
unitsList.addEventListener('change', function(){
    units = this.value
    localStorage.setItem('units', this.value)
}); 

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener('click', getDataFromApi)
// funkcija kuri gauna duomenis is API
async function getDataFromApi() {
    // paimu irasyta miesta is input ir nustatau
    
    city = cityName.value
    localStorage.setItem('city', city)
    // url yra skirtas pasiimti duomenis is api
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
    'q=' + city +
    '&units=' + units +
    '&lang=' + lang +
    '&appid=' + apiKey
    
    // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
    // fetch(url)
    //     .then(response => response.json())
    //     // data => jusu kodas
    //     .then(function (data) {
        //         //paduodu gautus duomenis i funkcija
        //         showWeatherInDom(data)
        //     });
        
        let response = await fetch (url)
        let data = await response.json()
    showWeatherInDom(data)
}
// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
    // tikrinu ar mano response yra geras
    
    if (data.cod === '200') {
        console.log(data)
        
        
        // if ((mainCard.innerHTML == '') && (tabContainerWrapper.innerHTML == '')){
        //     createMainCardElements(data)         
        // }


        if(document.getElementById('mainCard')){
            document.getElementById('mainCard').remove()
        }

        // if(document.getElementsByClassName('tabContainerWrapper')[0]){
        //     console.log('ar veikia')
        //    document.getElementsByClassName('tabContainerWrapper')[0].remove()
        // } 

        const elements = document.getElementsByClassName("tabContainerWrapper");

        while (elements.length > 0) elements[0].remove();
        
        createMainCardElements(data)

        let tabContainerWrapper = document.createElement('div')
        tabContainerWrapper.setAttribute('class', 'tabContainerWrapper' )    

       
       
        for (let i = 1; i <= data.list.length; i += 2){
            createIndexTab(data, i,  tabContainerWrapper)            
        };
      
    } else {
        alert('kazkas negerai, patikrinti konsole')
        console.log('Kazkas negerai',data)
    }
    
}
//funkcija, kuri sukuria pagrindinę kortelę
function createMainCardElements(data) {
    
    let mainCard = document.createElement('div')
    mainCard.setAttribute('id', 'mainCard')
    
    mainSection.append(mainCard)        

    let cityDiv  = document.createElement('div')
        cityDiv.setAttribute('id', "cityDiv")
        mainCard.append(cityDiv)

    let weatherDescription = document.createElement('div')
        weatherDescription.setAttribute('id', 'weatherDescription')
        mainCard.append(weatherDescription)

    let imgAndTempDiv = document.createElement('div')
        imgAndTempDiv.setAttribute('id', 'imgAndTempDiv')
        mainCard.append(imgAndTempDiv)    
    
    let maincardDisplayImg = document.createElement('img')
        maincardDisplayImg.setAttribute('id', 'mainImg')
        imgAndTempDiv.appendChild(maincardDisplayImg)
   
    let temperatureDiv = document.createElement('div')
        temperatureDiv.setAttribute('id', 'temperatureDiv')
        imgAndTempDiv.append(temperatureDiv)

    let feelTemperature = document.createElement('div')
        feelTemperature.setAttribute('id', 'feelTemperature')
        mainCard.append(feelTemperature)
        
    let feelTemperatureImg = document.createElement('img')
        feelTemperature.setAttribute('class', 'mainCardImg')
        feelTemperature.append(feelTemperatureImg)
        feelTemperatureImg.src = 'resources/images/temperature-svgrepo-com.svg'
        
    let feelTemperatureText = document.createElement('div')
        feelTemperatureText.setAttribute('id', 'feelTemperatureText')
        feelTemperature.append(feelTemperatureText)

    let displayWindDiv = document.createElement('div')
        displayWindDiv.setAttribute('id', 'displayWindDiv')
        mainCard.append(displayWindDiv)
        
    let displayWindImg = document.createElement('img')
        displayWindImg.setAttribute('class', 'mainCardImg')
        displayWindDiv.append(displayWindImg)
        displayWindImg.src = 'resources/images/wind coloured.svg'
        
    let displayWindText = document.createElement('div')
        displayWindText.setAttribute('id', 'displayWindText')
        displayWindDiv.append(displayWindText)    
        
    displayweatherIcon(data, 0, maincardDisplayImg)  
    let curArray =  data.list[0]                                      
        cityDiv.innerText = data.city.name 
        weatherDescription.innerText = curArray.weather[0].description
        temperatureDiv.innerText =  curArray.main.temp + '°C'
    let feelTemperatureNumber =curArray.main.feels_like 
        feelTemperatureText.innerText = 'feels like'  + ' ' + feelTemperatureNumber + ' ' + '°C'
        displayWindText.innerText =  curArray.wind.speed + ' ' + 'm/s'

        

    changeLanguageInMainCard(feelTemperatureText, feelTemperatureNumber, )

    changeUnitsinMainCard(temperatureDiv, feelTemperatureNumber, feelTemperatureText, displayWindText, curArray )

    

    playBackgroundVideo(data, 0)

    
}
//funkcija, kuri parodo orų icon
function displayweatherIcon(fetchedData, index, iconDiv){
    let iconCode = fetchedData.list[index].weather[0].icon
    let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
    iconDiv.src = iconUrl  
}
//funkcija, kuri kuria papildomas grafas
function createIndexTab (data, index, wrapperDiv ){
  
        mainSection.append(wrapperDiv)


    let tabContainer =  document.createElement('div')
        tabContainer.setAttribute('class', 'tabContainer')
        wrapperDiv.append(tabContainer)

    let tabDate = document.createElement('div')
        tabDate.setAttribute('class', 'tabDate')
        tabContainer.append(tabDate)   

    let tabIcon = document.createElement('img')
        tabIcon.setAttribute('class', 'tabIcon')
        tabContainer.append(tabIcon)
    
    let tabText = document.createElement('div')
        tabText.setAttribute('class', 'tabText')
        tabContainer.append(tabText)

    let windIcon = document.createElement('img')
        windIcon.setAttribute('class', 'tabIcon')
        tabContainer.append(windIcon) 
        
    let windTextDiv = document.createElement('div')
        windTextDiv.setAttribute('class', 'windTextDiv')
        tabContainer.append(windTextDiv)     
        
        tabDate.innerHTML = data.list[index].dt_txt

        displayweatherIcon(data, index, tabIcon)

        tabText.innerHTML =  data.list[index].main.temp.toFixed(1) + ' ' + '°C'
        windIcon.src = 'resources/images/wind coloured.svg'
        windTextDiv.innerText = data.list[index].wind.speed.toFixed(1) + ' ' + 'm/s'
    
        changeUnitsInIndexTab(data, tabText, windTextDiv, index)    

}
//funkcija, kuri parenka banckround pagal pagrindines korteles icon code
function playBackgroundVideo(fetchedData, index){
    let iconCode = fetchedData.list[index].weather[0].icon

    if (iconCode == '01d'){
        video.src = 'resources/videos/clear day sky.mp4'
    } else if (iconCode == '01n'){
        video.src = 'resources/videos/clear night sky.mp4'
    } else if (iconCode == '02d'){
        video.src = 'resources/videos/little cloudy day.mp4'
    } else if (iconCode == '02n'){
        video.src = 'resources/videos/few clouds night.mp4'
    } else if ((iconCode == '03d') || (iconCode == '03n') || (iconCode == '04d') || (iconCode == '04n')){
        video.src = 'resources/videos/clouds.mp4'
    } else if ((iconCode == '09d') || (iconCode == '09n') || (iconCode == '10d') || (iconCode == '10n')){
        video.src = 'resources/videos/rain.mp4'
    } else if ((iconCode == '11d') || (iconCode == '11n')){
        video.src = 'resources/videos/thunderstorm.mp4'
    } else if ((iconCode == '13d') || (iconCode == '13n')){
        video.src = 'resources/videos/snowing.mp4'
    } else (video.src = 'resources/videos/mist.mp4')
    

}
//funkcija, kuri pakeičia kalbą in mainCard, bet veikia tik su išankstiniu nustatymu, t.y. nekeičia sukurtų elementų inner html
function changeLanguageInMainCard(div1, div2){
    if (lang == 'lt'){
        div1.innerText = "jutiminė temperatūra" + ' ' + div2 + ' ' + '°C'
    } else if (lang == 'ru'){
        div1.innerText = "сенсорная температура" + ' ' + div2 + ' ' + '°C'
    }else (div1.innerText = "feels like" + ' ' + div2 + ' ' + '°C')
}
//funkcija, kuri pakeičia units in mainCard to Farenheit and feet, bet veikia tik su išankstiniu nustatymu, t.y. nekeičia sukutų elementų inner html
function changeUnitsinMainCard(div1, div2, div3, div4, array){
    if(units == 'imperial'){
        div1.innerText =  array.main.temp + '°F'
        div3.innerText = 'сенсорная температура'  + ' ' + div2 + ' ' + '°F'
        div4.innerText =  array.wind.speed + ' ' + 'ft/s'
    }
    
}
//funkcija, kuri pakeičia units in indexTabs, bet veikia tik su išankstiniu nustatymu, t.y. nekeičia sukutų elementų inner html
function changeUnitsInIndexTab(inputData, div1, div2, index){
    if (units == 'imperial'){
        div1.innerHTML =  inputData.list[index].main.temp.toFixed(1) + ' ' + '°F'
        div2.innerText = inputData.list[index].wind.speed.toFixed(1) + ' ' + 'ft/s'
    }

}
