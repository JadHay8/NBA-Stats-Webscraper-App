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
        const pts_per_g = []
        const ast_per_g = []
        const reb_per_g = []
        const stl_per_g = []
        const blk_per_g = []
        const three_point_percentage = []
        //const three_points_made = []

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
            pts_per_g.push({
                name,
                team,
                points,
                games_played
            })
            //Pushing variables to ast_per_g array
            ast_per_g.push({
                name,
                team,
                assists,
                games_played
            })
            //Pushing variables to reb_per_g array
            reb_per_g.push({
                name,
                team,
                rebounds,
                games_played
            })
            //Pushing variables to stl_per_g array
            stl_per_g.push({
                name,
                team,
                steals,
                games_played
            })
            //Pushing variables to blk_per_g array
            blk_per_g.push({
                name,
                team,
                blocks,
                games_played
            })
            //Pushing variables to three_point_percentage array
            three_point_percentage.push({
                name,
                team,
                three_pt_percentage,
                games_played
            })
        })
        //Sorting arrays by category
        pts_per_g.sort((a,b) => b.points - a.points) // b - a for reverse sort
        ast_per_g.sort((a,b) => b.assists - a.assists) // b - a for reverse sort
        reb_per_g.sort((a,b) => b.rebounds - a.rebounds) // b - a for reverse sort
        stl_per_g.sort((a,b) => b.steals - a.steals); // b - a for reverse sort
        blk_per_g.sort((a,b) => b.blocks - a.blocks); // b - a for reverse sort
        //Doesn't work but still here for reference
        three_point_percentage.sort((a,b) => b.three_pt_percentage - a.three_pt_percentage); // b - a for reverse sort
        console.log("")     
        console.log("NBA Playoff Leaders 2022")
        console.log("")
        console.log("----------------------------------------------------")
        console.log("NBA Playoff Points Leaders per game (PPG)")
        console.log("----------------------------------------------------")
        for(let i = 0; i < 5; i++){
            console.log(`${pts_per_g[i].name} | ${pts_per_g[i].team} - ${pts_per_g[i].points} (${pts_per_g[i].games_played} games)`)
        }
        console.log("----------------------------------------------------")
        console.log("NBA Playoff Assist Leaders per game (APG)")
        console.log("----------------------------------------------------")
        for(let i = 0; i < 5; i++){
            console.log(`${ast_per_g[i].name} | ${ast_per_g[i].team} - ${ast_per_g[i].assists} (${ast_per_g[i].games_played} games)`)
        }
        console.log("----------------------------------------------------")
        console.log("NBA Playoff Rebounds Leaders per game (RPG)")
        console.log("----------------------------------------------------")
        for(let i = 0; i < 5; i++){
            console.log(`${reb_per_g[i].name} | ${reb_per_g[i].team} - ${reb_per_g[i].rebounds} (${reb_per_g[i].games_played} games)`)
        }
        console.log("----------------------------------------------------")
        console.log("NBA Playoff Steals Leaders per game (SPG)")
        console.log("----------------------------------------------------")  
        for(let i = 0; i < 5; i++){
            console.log(`${stl_per_g[i].name} | ${stl_per_g[i].team} - ${stl_per_g[i].steals} (${stl_per_g[i].games_played} games)`)
        }
        console.log("----------------------------------------------------")
        console.log("NBA Playoff Blocks Leaders per game (BPG)")
        console.log("----------------------------------------------------")
        for(let i = 0; i < 5; i++){
            console.log(`${blk_per_g[i].name} | ${blk_per_g[i].team} - ${blk_per_g[i].blocks} (${blk_per_g[i].games_played} games)`)
        }
        console.log("----------------------------------------------------")
        console.log("NBA Playoff 3 Point Percentage Leaders (3P%)")
        console.log("----------------------------------------------------")  
        for(let i = 0; i < 5; i++){
            console.log(`${three_point_percentage[i].name} | ${three_point_percentage[i].team} - ${three_point_percentage[i].three_pt_percentage} (${three_point_percentage[i].games_played} games)`)
        }      
        //console.log(pts_per_g)
        //console.log(ast_per_g)
        //console.log(reb_per_g)
        //console.log(stl_per_g)
        //console.log(blk_per_g)
        //console.log(three_point_percentage)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

