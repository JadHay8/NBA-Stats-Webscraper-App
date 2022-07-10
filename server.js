const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');

//Routers
const serverRouter = require('./routers/server-router');

app.locals.url = 'https://www.basketball-reference.com/playoffs/NBA_2022_per_game.html';
console.log(app.locals.url);

//Global variables
app.locals.top5_pts = [];
app.locals.top5_ast = [];
app.locals.top5_reb = [];
app.locals.top5_stl = [];
app.locals.top5_blk = [];
app.locals.top5_3pt = [];

//Setup middleware
app.set(path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Note sure if necessary but included incase

app.use((req, res, next)=> {
    console.log(`${req.method}: ${req.url}`);
    if (Object.keys(req.body).length > 0){
        console.log('Body: ');
        console.log(req.body);
    }
    next();
});


//Server Routes
app.use('/', serverRouter);

//Backend to Frontend video stuff

// app.get('/', function (req, res) {
//     res.json('This is my webscraper')
// })

// app.get('/results', () => {

// })


//app.listen
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

