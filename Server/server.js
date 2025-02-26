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
db.connect(err => { if (err) throw err; console.log('MySQL is connected'); });
module.exports = db;

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const UserRoutes = require('./routes/user');
app.use('/api/auth', UserRoutes);

app.use("/uploads", express.static("uploads"));

const DocumentRoutes = require('./routes/document');
app.use('/api/auth', DocumentRoutes);

app.use(cors({ origin: "http://localhost:5173", credentials: true })); 


app.listen(port, () => {
    console.log("Server is running on port " + port);
})