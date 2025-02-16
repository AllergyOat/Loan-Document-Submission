const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//Mysql Database Connection XD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '473625',
    database: 'dsldb'
});
db.connect(err => { if (err) throw err; console.log('MySQL Connected'); });

db.query('SELECT * FROM student', (err, results) => {
    if (err) {
        console.error('Database query error:', err);
    } else {
        console.log('Admin Data:', results);
    }
});



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