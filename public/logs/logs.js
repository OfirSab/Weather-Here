

async function getData() {
    const response = await fetch('/api')
    const data = await response.json()
    console.log(data);
    // console.log(data);
    for (item of data) {
        const root = document.createElement('p')
        const geo = document.createElement('div')
        const date = document.createElement('div')
        const country = document.createElement('div')
        const region = document.createElement('div')
        const text = document.createElement('div')
        const temp_c = document.createElement('div')
        const wind_kph = document.createElement('div')

        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = `date: ${dateString}`;
        geo.textContent = `Lat:${item.lat} Lon: ${item.lon}`;
        country.textContent = `country : ${item.country}`;
        region.textContent = `region : ${item.region}`;
        text.textContent = `text : ${item.text}`;
        temp_c.textContent = `temp_c : ${item.temp_c}`;
        wind_kph.textContent = `wind_kph : ${item.wind_kph}`;


        root.append(geo, date, country, region, text, temp_c, wind_kph);
        document.body.append(root);
    }

}

getData();