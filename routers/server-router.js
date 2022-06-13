const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

//Router methods
router.get('/', getHomepage);

//Helper function to send 404 response
function send404(response){
    response.statusCode = 404;
    response.write("Unknown Resource error");
    response.end();
}

function statSort(array,stat){
    array.sort((a,b) => b.stat - a.stat);
    let newArray = array.slice(0,5);
    return newArray;
}

function getHomepage(){
    axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const playerstats = [];

        $('tr[class="full_table"]',html).each(function(){
            
            //Variables to find player name and points per game
            const name = $(this).find('td[data-stat="player"]').text()
            const points = $(this).find('td[data-stat="pts_per_g"]').text()
            const assists = $(this).find('td[data-stat="ast_per_g"]').text()
            const rebounds = $(this).find('td[data-stat="trb_per_g"]').text()
            const steals = $(this).find('td[data-stat="stl_per_g"]').text()
            const blocks = $(this).find('td[data-stat="blk_per_g"]').text()
            const three_pt_percentage = $(this).find('td[data-stat="fg3_pct"]').text()
            const games_played = $(this).find('td[data-stat="g"]').text()
            const team = $(this).find('td[data-stat="team_id"]').text()
            //Pushing variables to pts_per_g array
            playerstats.push({
                name,
                team,
                games_played,
                points,
                assists,
                rebounds,
                steals,
                blocks,
                three_pt_pct
            })
        })
        //Sorting arrays by category
        console.log(statSort(playerstats,points));
        console.log(statSort(playerstats,assists));
        console.log(statSort(playerstats,rebounds));
        console.log(statSort(playerstats,steals));
        console.log(statSort(playerstats,blocks));
        console.log(statSort(playerstats,three_pt_pct));

    }).catch(err => console.log(err));
}