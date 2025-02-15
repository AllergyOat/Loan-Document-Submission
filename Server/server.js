const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 5000;


app.use(morgan('dev'));
app.use(express.json());


app.get('/api', (req, res) => {
    res.send("Hello World!");
})

app.post('/api', (req, res) => {
    console.log(req.body);
    res.send("Post request received!");
})


app.listen(port, () => {
    console.log("Server is running on port " + port);
})