const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const path = require('path');
const app = express();
const port = 11353;
const ipAddress = '192.168.1.131';
const client = new Client({
    host: ipAddress,
    user: "postgres",
    port: 5432,
    password: "271210",
    database: "pizzahut"
});


app.use(bodyParser.json());

app.use(express.static(__dirname));

export var users;
export var employees;

app.get('', async (req, res) => {
    console.log('GET request received for index.html');
    res.sendFile(__dirname + '/index.html');

    await client.connect();
    const query = 'SELECT * FROM Username;';
    users = await client.query(query);
    await client.end();
});

app.get('', async (req, res) => {
    console.log('GET request received for index.html');
    res.sendFile(__dirname + '/index.html');

    await client.connect();
    const query = 'SELECT * FROM Employee;';
    employees = await client.query(query);
    await client.end();
});

