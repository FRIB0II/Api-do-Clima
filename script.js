const chaveApi = "aec72b596d9cb84b8d0d59457b32b2ed";

function BuscaCidade()
{
    var cidade = document.getElementById("search").value;
    var requisicao = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveApi}&lang=pt_br&units=metric`;

    fetch(requisicao).then(resposta => resposta.json())
                    .then(dados => {
                        var resultado = document.getElementById("api-body");
                        resultado.innerHTML = 
                        `
                        <h2>${dados.name}</h2>
                        <p>Temperatura: ${dados.main.temp}°C</p>
                        <p>Clima: ${dados.weather[0].description}</p>
                        <p>Umidade: ${dados.main.humidity}%</p>
                        `

                        }
                        )
}