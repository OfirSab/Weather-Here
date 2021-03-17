const express = require('express')
const Datastore = require('nedb')
require('dotenv').config()

const fetch = require('node-fetch')
const app = express()

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server in running on PORT ${port}`); })
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const db = new Datastore('database.db');
const xml = new Datastore('xml.db');
db.loadDatabase();
xml.loadDatabase();

app.get('/api', (req, res) => {
    db.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        res.json(docs);
    });
})

app.post('/api', (req, res) => {
    const data = req.body
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data)
    res.json(data)
})


app.get('/weather/:latlon', async (req, res) => {
    const latlon = req.params.latlon;
    const api_key = process.env.API_KEY;
    const weather_response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latlon}&aqi=yes`);
    const weather_json = await weather_response.json();
    const data = {
        weather: weather_json
    }
    res.json(data)
})


// app.get('/sea', async (req, res) => {
//     const sea_response = await fetch(`https://ims.data.gov.il/sites/default/files/isr_sea.xml`);
//     const sea_xml = await sea_response.text();
//     let parser = new DOMParser();
//     let xmlDoc = parser.parseFromString(sea_xml, 'text/xml')
//     // console.log(xmlDoc.getElementsByTagName('Originator'[0]).firstCh(ild);
//     console.log("L" + xmlDoc.getElementsByTagName('LocationMetaData')[0].getAttribute('LocationId'));
// })