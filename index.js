const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const res = require('express/lib/response')

const app = express()

const url = 'https://www.basketball-reference.com/playoffs/NBA_2022_per_game.html'


app.get('/', (request, response) => {
    response.json("Hello World")
})

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const stats = []

        $('tr[class="full_table"]',html).each(function(){
            
            //Variables to find player name/team and corresponding stats per game
            const name = $(this).find('td[data-stat="player"]').text()
            const points = $(this).find('td[data-stat="pts_per_g"]').text()
            const assists = $(this).find('td[data-stat="ast_per_g"]').text()
            const rebounds = $(this).find('td[data-stat="trb_per_g"]').text()
            const steals = $(this).find('td[data-stat="stl_per_g"]').text()
            const blocks = $(this).find('td[data-stat="blk_per_g"]').text()
            const three_pt_pct = $(this).find('td[data-stat="fg3_pct"]').text()
            const games_played = $(this).find('td[data-stat="g"]').text()
            const team = $(this).find('td[data-stat="team_id"]').text()

            //Pushing variables to stats array
            stats.push({
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
    

        //Sort stats in descending order by a given stat

        function ptsSort(array){
            array.sort((a,b) => b.points - a.points); // b - a for reverse sort
            
            return array;
        }

        function astSort(array){
            array.sort((a,b) => b.assists - a.assists); // b - a for reverse sort
            
            return array;
        }

        function rebSort(array){
            array.sort((a,b) => b.rebounds - a.rebounds); // b - a for reverse sort
            
            return array;
        }

        function stlSort(array){
            array.sort((a,b) => b.steals - a.steals); // b - a for reverse sort
            
            return array;
        }

        function blkSort(array){
            array.sort((a,b) => b.blocks - a.blocks); // b - a for reverse sort
            
            return array;
        }

        function threeSort(array){
            array.sort((a,b) => b.three_pt_pct - a.three_pt_pct); // b - a for reverse sort
            
            return array;
        }
        
        rebSort(stats);
        console.log(stats);
        
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

