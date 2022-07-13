const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.basketball-reference.com/playoffs/NBA_2022_per_game.html';

//Router methods
router.get('/', (req,res) => {
    res.render('homepage');
    res.statusCode = 200;
});
router.get('/top5', (req,res) => {
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
            const three_pt_pct = $(this).find('td[data-stat="fg3_pct"]').text()
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
        //console.log(statSort(playerstats,"points"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"assists"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"rebounds"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"steals"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"blocks"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"three_pt_pct"));
        // console.log("========================================================================================================================");
        // console.log(statSort(playerstats,"alphabetical"));
        res.render('top5', {top5_points:statSort(playerstats,"points"),top5_ast:statSort(playerstats,"assists"),top5_reb:statSort(playerstats,"rebounds"),top5_stl:statSort(playerstats,"steals"),top5_blk:statSort(playerstats,"blocks"),top5_3pt:statSort(playerstats,"three_pt_pct")})
    }).catch(err => console.log(err));
});
router.get('/playersearch', (req,res) =>{
    res.render('playersearch');
});

function statSort(array,stat){
    switch(stat){
        case "points":
            return array.sort((a,b) => b.points - a.points).slice(0,5);
        case "assists":
            return array.sort((a,b) => b.assists - a.assists).slice(0,5);
        case "rebounds":
            return array.sort((a,b) => b.rebounds - a.rebounds).slice(0,5);
        case "steals":
            return array.sort((a,b) => b.steals - a.steals).slice(0,5);
        case "blocks":
            return array.sort((a,b) => b.blocks - a.blocks).slice(0,5);
        case "three_pt_pct":
            return array.sort((a,b) => b.three_pt_pct - a.three_pt_pct).slice(0,5);
        default:
            return array.sort((a, b) => a.name.localeCompare(b.name)).slice(0,5); //default top 5 alphabetically (by first name)
    }
}

module.exports = router;