const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.basketball-reference.com/playoffs/NBA_2022_per_game.html";

//Router methods
// router.get("/", (req, res) => {
//   res.render("homepage");
//   res.statusCode = 200;
// });
// router.get("/top5", (req, res) => {

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const playerstats = [];
    var id = 1;

    $('tr[class="full_table"]', html).each(function () {
      //Variables to find player name and points per game
      const name = $(this).find('td[data-stat="player"]').text();
      const points = $(this).find('td[data-stat="pts_per_g"]').text();
      const assists = $(this).find('td[data-stat="ast_per_g"]').text();
      const rebounds = $(this).find('td[data-stat="trb_per_g"]').text();
      const steals = $(this).find('td[data-stat="stl_per_g"]').text();
      const blocks = $(this).find('td[data-stat="blk_per_g"]').text();
      const three_pt_pct = $(this).find('td[data-stat="fg3_pct"]').text();
      const games_played = $(this).find('td[data-stat="g"]').text();
      const team = $(this).find('td[data-stat="team_id"]').text();
      //Pushing variables to playerstats array
      playerstats.push({
        id,
        name,
        team,
        games_played,
        points,
        assists,
        rebounds,
        steals,
        blocks,
        three_pt_pct,
      });
      id++;
    });
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
    //   res.render("top5", {
    //     top5_points: JSON.stringify(statSort(playerstats, "points")),
    //     top5_ast: JSON.stringify(statSort(playerstats, "assists")),
    //     top5_reb: JSON.stringify(statSort(playerstats, "rebounds")),
    //     top5_stl: JSON.stringify(statSort(playerstats, "steals")),
    //     top5_blk: JSON.stringify(statSort(playerstats, "blocks")),
    //     top5_3pt: JSON.stringify(statSort(playerstats, "three_pt_pct")),
    //   });
    const top5_pts_arr = statSort(playerstats, "points");
    const top5_ast_arr = statSort(playerstats, "assists");
    const top5_reb_arr = statSort(playerstats, "rebounds");
    const top5_stl_arr = statSort(playerstats, "steals");
    const top5_blk_arr = statSort(playerstats, "blocks");
    const top5_3pt_arr = statSort(playerstats, "three_pt_pct");
    //can make these into objects instead of arrays using for loop - if necessary:

    // const top5_pts_data = top5_pts_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});
    // const top5_ast_data = top5_ast_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});
    // const top5_reb_data = top5_reb_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});
    // const top5_stl_data = top5_stl_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});
    // const top5_blk_data = top5_blk_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});
    // const top5_3pt_data = top5_3pt_arr.reduce((accumulator, value, index) => {
    //   return { ...accumulator, ["player" + index]: value };
    // }, {});

    //create each stat object:
    const pts = {
      id: 1,
      value: "top 5 points",
      data: top5_pts_arr,
    };
    const asts = {
      id: 2,
      value: "top 5 assists",
      data: top5_ast_arr,
    };
    const rebs = {
      id: 3,
      value: "top 5 rebounds",
      data: top5_reb_arr,
    };
    const stls = {
      id: 4,
      value: "top 5 steals",
      data: top5_stl_arr,
    };
    const blks = {
      id: 5,
      value: "top 5 blocks",
      data: top5_blk_arr,
    };
    const thpt = {
      id: 6,
      value: "top 5 three",
      data: top5_3pt_arr,
    };

    //create entire object holding everything:
    stats = {
      pts,
      asts,
      rebs,
      stls,
      blks,
      thpt,
    };

    const fs = require("fs");

    fs.writeFile(
      "./table/public/stats.json",
      JSON.stringify(stats, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File successfully written!");
        }
      }
    );
  })
  .catch((err) => console.log(err));
// });

// router.get("/playersearch", (req, res) => {
//   res.render("playersearch");
// });

//Functions:

function statSort(array, stat) {
  switch (stat) {
    case "points":
      return array.sort((a, b) => b.points - a.points).slice(0, 5);
    case "assists":
      return array.sort((a, b) => b.assists - a.assists).slice(0, 5);
    case "rebounds":
      return array.sort((a, b) => b.rebounds - a.rebounds).slice(0, 5);
    case "steals":
      return array.sort((a, b) => b.steals - a.steals).slice(0, 5);
    case "blocks":
      return array.sort((a, b) => b.blocks - a.blocks).slice(0, 5);
    case "three_pt_pct":
      return array.sort((a, b) => b.three_pt_pct - a.three_pt_pct).slice(0, 5);
    default:
      return array.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 5); //default top 5 alphabetically (by first name)
  }
}
