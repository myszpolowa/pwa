const temp = document.querySelector('p.temp')
const errormsg = document.querySelector('p.error_message')
const descripcion = document.querySelector('p.descripcion')
const city = document.querySelector('h2.cuty_name')
const button = document.querySelector('button')
const feeltemp = document.querySelector('feels_like')
const weatherimg = document.querySelector('img')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const windspeed = document.querySelector('.wind_speed')
const clouds = document.querySelector('.clouds')
const visibility = document.querySelector('.visibility')



const apiinfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q',
    key : '661695878ec14c0e05e7caff71ac1cc6',
    inits : '&units=metric',
    lang : '&lang=pl'
}
function getweatherinfo(){
    const apiinfocity = input.value || "Gdynia";
    const URL = `${apiinfo.link}${apiinfocity}${apiinfo.key}${apiinfo.units}${apiinfo.lang}`
    //console.lang(URL)

    axios.get(URL).then ((respons) => {
        weatherimg.scr = ` https://openweathermap.org/img/wn/${respons.date.weather[0].
                           icon}@2x.png`;
        city.textContent = `${respons.data.name}, ${respons.date.sys.country}`;
        temp.textContent = `${Math.round(respons.data.main.temp)} ℃`;
        descripcion.textContent = `${respons.data.weather[0].descripcion}`;
        feeltemp.textContent = `${Math.round(respons.data.main.feelslike)} ℃`;
        pressure.textContent = `${respons.data.main.pressure} hpa`;
        humidity.textContent = `${respons.data.main.humidity}%`;
        windspeed.textContent = `${respons.data.wind.speed} m/s`;
        clouds.textContent = `${respons.data.clouds.all}%`;
        visibility.textContent = `${respons.data.visibility / 1000} km`;
        errormsg.textContent = '';
    }).catch((error)=> {
        errormsg.textContent = `${error.respons.data.cod} - 
        ${error.respons.data.massege}`
        weatherimg.scr = '';
        [city,temp,descripcion,feeltemp,windspeed,humidity,pressure,
            visibility,clouds].forEach(el=> el.textContent = '');
    }).finally(()=> {
        input.value = '';
})
}
function getweatherinfobyenter(e) {
    if (e.key === 'Enter'){
        getweatherinfo()
    }
}

button.addEventListener('click', getweatherinfo);
button.addEventListener('keypress', getweatherinfobyenter);
