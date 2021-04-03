const express = require('express');
const knex = require('knex');
const cors = require('cors');

const signin = require('./controller/signin')
const register = require('./controller/register');
const image = require('./controller/image')


const app = express();

app.use(cors())
app.use(express.json())


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
        }
  }
});

app.get('/', (req, res) => res.send('it is working'))

app.post('/register', (req, res) => register.handleRegister(req, res, db) )

app.post('/signin', (req, res) => signin.handleSignin(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageAPI', (req, res) => image.handleImageApiCall(req, res))




app.listen(process.env.PORT || 3000, () => {
    console.log('hello')
})
