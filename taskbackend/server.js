const express = require('express');
const mongoose = require('mongoose');
var routes = require('./routes/taskRouter')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 7000;

const mongodbURL = 'mongodb+srv://bharatbc:Bharath1879@cluster0.59ju5s6.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongodbURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const dbconnection = mongoose.connection;

app.listen(port, () => {
    console.log(`server started ${port}`)
})

dbconnection.once("open", () => {
    console.log('mongodb connected..!!')
})

app.use(cors());
app.use(bodyParser.json());
app.use(routes)
