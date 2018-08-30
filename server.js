const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const path  =  require('path');
const routes = require('./routes/routes');
const app =  new express();

var port = process.env.PORT || 4200;

mongoose.connect('mongodb://localhost:27017/article')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("views",path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use(routes);



app.listen(port, () => {
    console.log(`Server started on ${port}`);
});