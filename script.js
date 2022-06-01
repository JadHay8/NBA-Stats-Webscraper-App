// //import fetch from 'node-fetch';
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// fetch("C:\Users\jadha\Documents\Projects\webScraper\jsonStats\pts.json") //Has to be an http url
// .then(function(response){
//     return response.json();
// })
// .then(function(points){
//     let placeholder = document.querySelector('#data-output')

//     let out = "";

//     for (let p of points){
//         out += `
//             <tr>
//                 <td>${p.name}</td>
//                 <td>${p.team}</td>
//                 <td>${p.points}</td>
//                 <td>${p.games_played}</td>
//             </tr>
//         `;
//     }

//     placeholder.innerHTML = out;
// })

const fs = require('fs');

function jsonReader(filePath,cb){
    fs.readFile(filePath,'utf-8', (err, fileData) => {
        if (err) {
        return cb && cb(err);
        }

        try {
            const data = JSON.parse(fileData);
            return cb && cb(null,data);
        } catch (err){
            return cb && cb(err);
        }
    });
}

jsonReader('./jsonStats/pts.json',(err,data) => {
    if (err){
        console.log(err);
    } else {
        console.log(data[0].points);
    }
});