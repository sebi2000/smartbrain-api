const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = require('knex')({
    client: 'pg',
    connection: {
      //host : process.env.DATABASE_URL,
      connectionString: process.env.DATABASE_URL,
      ssl: {
          rejectUnauthorized: false
      }
      //user : 'postgres',
      //password : 'gabriel21',
      //database : 'smart-brain'
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
    res.send('it is working!!');
})

/* SIGN IN */
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt);  });

/* REGISTER */
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } );

/* IMAGE */
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db)});

/*  

PROFILES

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
 
    db.select('*').from('users').where({
        id: id
    })
    .then(user=> {
        if(user.length > 1)
            res.json(user[0]);
        else res.status(400).json('Not found')
    })
    .catch(err => res.status(400).json('Error getting user'));

})
*/

/*

ROOT

app.get('/', (req,res) => {
    //res.send(database.users);
})*/

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})

