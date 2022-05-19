const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.basketball-reference.com/playoffs/NBA_2022_per_game.html#per_game_stats::pts_per_g'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const result = []

        $('tr[class="full_table"]',html).each(function(){
            //const rank = $(this).find('th').text()
            const name = $(this).find('td[data-stat="player"]').text()
            const points = $(this).find('td[data-stat="pts_per_g"]').text()
            result.push({
                name,
                points
            })
        })
        //console.log(result)
        result.sort((a,b) => b.points - a.points); // b - a for reverse sort
        console.log(result)
    
    }).catch(err => console.log(err))

    
   
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

