const api = {
    key: "8151140c618d3ea1a580b7f6d37c0976",
    baseURL: "http://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

// function getResults(query)
// {
//     const res = fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//         return weather.json();
//     }).then(displayResult);
//     // console.log(res);
//     // const weather = res.json();

//     // displayResult(weather);
// }

async function getResults(query) {
    const res = await fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`);

    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    console.log(result);

    let city = document.querySelector('.location .city');
    city.innerHTML = `${result.name},${result.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(result.main.temp)}<span>°c</span>`;

    let weather01 = document.querySelector('.current .weather');
    weather01.innerHTML = result.weather[0].main;

    let high = document.querySelector('.current .high');
    high.innerHTML = `High - ${Math.round(result.main.temp_max)}<span>°c</span>`;

    let low = document.querySelector('.current .low');
    low.innerHTML = `Low - ${Math.round(result.main.temp_min)}<span>°c</span>`;
}

function dateBuilder(d) {
    var months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];


    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}