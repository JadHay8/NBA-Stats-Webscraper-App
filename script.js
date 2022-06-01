const fetch = require("node-fetch");

fetch("./jsonStats/pts.json")
.then(function(response){
    return response.json();
})
.then(function(points){
    let placeholder = document.querySelector('#data-output')

    let out = "";

    for (let p of points){
        out += `
            <tr>
                <td>${p.name}</td>
                <td>${p.team}</td>
                <td>${p.points}</td>
                <td>${p.games_played}</td>
            </tr>
        `;
    }

    placeholder.innerHTML = out;
})