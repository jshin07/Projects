const express = require ("express");
const path = require("path");
const bodyParser = require ("body-parser");
const app= express();
const session = require('express-session');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public/bicycleApp/dist")));
app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true
}));



require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


app.listen(8000, function(){
    console.log("listening on port 8000");
})
