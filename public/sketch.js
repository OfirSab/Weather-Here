let lat, lon;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('lat').textContent = lat;
            document.getElementById('lon').textContent = lon;

            const api_url = `/weather/${lat},${lon}`;
            const response = await fetch(api_url)
            const json = await response.json();
            document.getElementById('country').textContent = json.weather.location.country
            document.getElementById('region').textContent = json.weather.location.region
            document.getElementById('temp-text').textContent = json.weather.current.condition.text
            document.getElementById('temp').textContent = json.weather.current.temp_c
            document.getElementById('wind').textContent = json.weather.current.wind_kph
            const data = {
                lat: lat,
                lon: lon,
                country: json.weather.location.country,
                region: json.weather.location.region,
                text: json.weather.current.condition.text,
                temp_c: json.weather.current.temp_c,
                wind_kph: json.weather.current.wind_kph
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response_data = await fetch('/api', options)
            const response_json = await response_data.json()


        } catch {
            console.log("Error");
        }
    });
} else {
    console.log("ERROR geolocation not avaliable");
}

// const button = document.getElementById('submit')
// button.addEventListener('click', async event => {

// })

