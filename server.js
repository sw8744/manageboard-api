const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: '210.114.22.146',
    user: 'root',
    password: 'ishs123!',
    database: 'test',
    enableKeepAlive: true
});

connection.connect((err) => {
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully Connected');
        }
    });
});


app.get('/mywriting', (req, res) => {
    const q = req.query;
    const author = q.author;
    if(author != undefined) {
            connection.query('SELECT * FROM posts WHERE author=' + author, (err, results) => {
                res.json(results);
            });
    }
    else {
        res.json('Error');
    }
});

app.get('/get', (req, res) => {
        connection.query('SELECT * FROM posts', (err, results) => {
            res.json(results);
        });
});

app.get('/post', (req, res) => {
    const q = req.query;
    const title = q.title;
    const author = q.author;
    const content = q.content;
    if(title != undefined && author != undefined && content != undefined) {
            connection.query(`INSERT INTO posts (title, author, content) VALUES ('${title}', ${author}, '${content}')`, (err, results) => {
                if (err) throw err;
                res.json(results);
            });
    }
    else {
        res.json('Error');
    }
});

app.listen(3001);