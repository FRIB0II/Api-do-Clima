const chaveApi = "aec72b596d9cb84b8d0d59457b32b2ed";

var map = L.map('map').setView([51.505, -0.09], 9)
var marker = L.marker([51.5, -0.09]).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function GetCity()
{
    var busca = document.querySelector("#search-input").value;
    var partes = busca.split(',');
    var cidade = partes[0].trim();
    var estado = partes[1] ? partes[1].trim() : '';
    var pais = partes[2] ? partes[2].trim() : ''; 
    var requisicao = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${estado},${pais}&appid=${chaveApi}&lang=pt_br&units=metric`;
    fetch(requisicao).then(resposta => resposta.json())
                    .then(dados => {
                        console.log(dados);
                        var resultado = document.querySelector("#api-body");
                        var urlIcon = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
                        resultado.innerHTML = 
                        `
                        <h2>${dados.name}</h2>
                        <br>
                        <p>Temperatura: ${dados.main.temp}°C</p>
                        <br>
                        <p>Sensação térmica: ${dados.main.feels_like}°C</p>
                        <br>
                        <p>Temperatura min: ${dados.main.temp_min}°C</p>
                        <br>
                        <p>Temperatura max: ${dados.main.temp_max}°C</p>
                        <br>
                        <p>Clima: ${dados.weather[0].description}</p>
                        <img src="${urlIcon}" alt="Icone-Clima">
                        <br>
                        <p>Umidade: ${dados.main.humidity}%</p>
                        `
                            var lon = dados.coord.lon;
                            var lat = dados.coord.lat;
                            console.log(`${lon}, ${lat}`)
                            UpdateMap(lon, lat);
                        }
                        )
}

document.addEventListener("DOMContentLoaded", function() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var requisicao = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chaveApi}&lang=pt_br&units=metric`;

            fetch(requisicao)
                .then(resposta => resposta.json())
                .then(dados => {
                    console.log(dados);
                    var resultado = document.querySelector("#api-body");
                    var urlIcon = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
                    resultado.innerHTML = 
                    `
                    <h2>${dados.name}</h2>
                    <br>
                    <p>Temperatura: ${dados.main.temp}°C</p>
                    <br>
                    <p>Sensação térmica: ${dados.main.feels_like}°C</p>
                    <br>
                    <p>Temperatura min: ${dados.main.temp_min}°C</p>
                    <br>
                    <p>Temperatura max: ${dados.main.temp_max}°C</p>
                    <br>
                    <p>Clima: ${dados.weather[0].description}</p>
                    <img src="${urlIcon}" alt="Icone-Clima">
                    <br>
                    <p>Umidade: ${dados.main.humidity}%</p>
                    `
                    UpdateMap(lon, lat)
                })
                .catch(error => console.error('Erro:', error));
        });
    } 
    else 
    {
        console.log("Geolocalização não é suportada por este navegador.");
    }
});

function UpdateMap(lon, lat)
{   
    console.log(`${lon}, ${lat}`);
    marker.setLatLng([lat, lon]);
    map.setView([lat, lon], 9);
}

map.on('click', function(e){
    UpdateMap(e.latlng.lat, e.latlgn);
});
