const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 5001;

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

//Templating Engine - USING ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

//Routes
const newsRouter = require('./src/routes/news');

app.use('/', newsRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})