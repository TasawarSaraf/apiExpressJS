const express = require('express');

const https = require("https")

const bodyParser = require("body-parser")
const app = express();
const port = 3000;  // Replace with your desired port number


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

 
});






app.post("/", (req,res)=>{
    const query = req.body.cityName

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units=imperial&appid=d3d4a0bddf04d50ac752f8c31d8cd929";
    https.get(url, (response)=>{
        console.log(response.statusCode);


        response.on("data", (data)=>{
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const placeName = weatherData.name
        res.write("<h1>The temperature is " + temp + " Fahrenheit in " + placeName + "</h1>");
        
        })
    });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


