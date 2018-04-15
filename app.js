const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

// port
const port = process.env.PORT || 3000;

// use cors middle ware
app.use(cors());

// use body-parser
app.use(bodyParser.json());

// listen to / 
app.get('/',(request,response) => {
    response.send('this is root');
});
// run
app.listen(port,() => {
    console.log("server running at port 3000");
});