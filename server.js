const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
//const { isTableReserved } = require('./verificare_rezervare');
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


app.get('', (req, res) => {
    console.log('GET request received for index.html');
    res.sendFile(__dirname + '/index.html');
});


app.get('/index.html', (req, res) => {
    console.log('GET request received for index.html');
    res.sendFile(__dirname + '/index.html');
});

app.get('/rezervare.html', (req, res) => {
    console.log('GET request received for rezervare.html');

    const { method, url, headers } = req;
    console.log(`Request received - Method: ${method}, URL: ${url}`);
    console.log('Request Headers:', headers);
    res.send(`<h1>GET request received for rezervare.html</h1>
              <p>Method: ${method}</p>
              <p>URL: ${url}</p>
              <p>Request Headers:</p>
              <pre>${JSON.stringify(headers, null, 2)}</pre>`);
});


app.post('/rezervare.html', async (req, res) => {
    try {
        //const { nume, telefon, data, ora } = req.body;
        //const {name, phone_number, num_of_persons, reservation_date, reservation_time, message} = req.body;
        const reservationDate = req.body.reservation_date;
        const reservationTime = req.body.reservation_time;

        const name = req.body.name;
        const phone_number = req.body.phone_number;

        const string_num_of_persons = req.body.num_of_persons;
        const num_of_persons = parseInt(string_num_of_persons);

        const message = req.body.message;
        const reservation_datetime = reservationDate + ' ' + reservationTime;


        await client.connect();
        if (!name || !phone_number || !reservationDate || !reservationTime) {
            throw new Error('Missing required reservation data');
        }
        //const query = 'INSERT INTO reservations(name, phone_number, num_of_persons, reservation_datetime, message) VALUES(\'nou test\', \'0736756433\', 4, \'2024-05-20 10:00:00\', \'nu\');';

        const query = `INSERT INTO reservations(name, phone_number, num_of_persons, reservation_datetime, message) VALUES(\'${name}\', \'${phone_number}\', ${num_of_persons}, \'${reservation_datetime}\', \'${message}\');`;
        await client.query(query);
        await client.end();

        res.status(200).send(`${name}, ${phone_number}, ${num_of_persons}, ${reservation_datetime}, ${message}`);
    } catch (error) {
        console.error('Error handling reservation:', error);
        res.status(500).send(`Internal Server Error`, error);
    }
});

const jwt = require('jsonwebtoken');

//Verificare token in BD
app.post('/login', async (req, res) =>{
    
    const {username, password} = req.body;
    try {
  
        await client.connect();
        // Verific corectitudinea username-ului
        const exist_user = await client.query('SELECT * FROM Users WHERE Username = $1', [username]);
        const user = exist_user.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const newToken= jwt.sign({userId: username}, 'secret');
    
        if (newToken == user.token) {
            res.status(401).json({ message: 'User already logged in.' });
            return;
        }
        else {
            await client.query('INSERT INTO Users (Username, token) VALUES ($1, $2)', [username, newToken]);
        }

        // Tokenul este valid, permite accesul la pagina principala
    
        res.json({ message: `Welcome, ${username}!` });
      } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
      } finally {
        await client.end();
      }
});

// Verificare token prin alte rute
app.get('/dashboard', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'secret');
      const username = decodedToken.username;
  
      await client.connect();
  
      const result = await client.query('SELECT Username, token FROM Users WHERE Username = $1 AND token = $2', [username, token]);
      const validToken = result.rows[0];
  
      if (!validToken) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // Accesul la pagina protejata este permis
      res.json({ message: 'Welcome to the protected route!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error verifying token.' });
    } finally {
      await pgClient.end();
    }
  });
  

app.listen(port, ipAddress, () => {
    console.log(`Server listening at http://${ipAddress}:${port}`);
});