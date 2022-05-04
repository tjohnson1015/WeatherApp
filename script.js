
const button = document.querySelector('#button-addon2')
const body = document.querySelector('.main-body')


button.addEventListener('click', () => {
    const input = document.querySelector('.form-control').value
    console.log(input)
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${input},US&appid=34d5e7386f8e86cfa268f470c4a007b7`)
    .then(res => res.json())
    .then(data => {
        let lati = data.lat
        let long = data.lon
        let city = data.name
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=34d5e7386f8e86cfa268f470c4a007b7&units=imperial`)
            .then(res => res.json())
            .then(data => {
                const scity = data.name
                const temp = Math.trunc(data.main.temp)
                const ftemp = Math.trunc(data.main.feels_like)
                const hum = Math.trunc(data.main.humidity)
                const high = Math.trunc(data.main.temp_max)
                const low = Math.trunc(data.main.temp_min)
                const desc = data.weather[0].description
                const desc2 = desc.charAt(0).toUpperCase() + desc.slice(1)
                const desc3 = desc2.split(" ")[0]
                const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                const iconId = data.weather[0].id 
                console.log(iconId)
                if (iconId > 200 && iconId < 532)  {
                    body.className = 'rain'
                }
                    else if (iconId > 599 && iconId < 623) {
                        body.className = 'snow'
                    }
                    else if (iconId == 741) {
                        body.className = 'fog'
                    }
                    else if (iconId == 800) {
                        body.className = 'clear'
                    }
                    else if (iconId > 800) {
                        body.className = 'cloudy'
                    }
                const html = `
                <div class="card mb-3" style="max-width: 100%; margin: 10%;">
                <div class="row g-0">
                <div class="col-md-6">
                    <img src="${icon}" class="img-fluid rounded-start" alt="..." style="width: 100%;">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                    <h5 class="card-title">${city}</h5>
                    <h6 class="card-sub-title">${scity}</h6>
                    <p class="card-text">${desc2} <br> Temperature: ${temp}°F <br> Feels Like: ${ftemp}°F <br> High: ${high}°F <br> Low: ${low}°F <br> Humidity: ${hum}% </p>
                    <p class="card-text"><small class="text-muted">Last updated just now</small></p>
                    </div>
                </div>
                </div>
                </div>
                `
                document.querySelector('#main').innerHTML = html
            })
            })
})


