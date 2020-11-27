const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));
const port = 3000;

const server = app.listen(port, function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
});

const data_Project = [];

app.get('/all', function sendData (req, res) {
  res.send(data_Project);
});

app.post('/addData', function get_Data_Weather(req, res){
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    emotions: req.body.emotions,
  };

  data_Project.push(newEntry);
  console.log(data_Project);
  res.status(204).end();
});