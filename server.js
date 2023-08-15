const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

const pool = mysql.createPool({
    host: '210.114.22.146',
    user: 'root',
    password: 'ishs123!',
    database: 'test'
});

pool.getConnection((err, connection) => {
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
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM posts WHERE author=' + author, (err, results) => {
                res.json(results);
            });
        });
    }
    else {
        res.json('Error');
    }
});

app.get('/get', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM posts', (err, results) => {
            res.json(results);
        });
    });
});

app.get('/post', (req, res) => {
    const q = req.query;
    const title = q.title;
    const author = q.author;
    const content = q.content;
    if(title != undefined && author != undefined && content != undefined) {
        pool.getConnection((err, connection) => {
            connection.query(`INSERT INTO posts (title, author, content) VALUES ('${title}', ${author}, '${content}')`, (err, results) => {
                if (err) throw err;
                res.json(results);
            });
        });
    }
    else {
        res.json('Error');
    }
});

app.listen(3001);