const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const cokkieparser = require('cookie-parser')
const session = require('express-session')
    //load user model
require('./models/users')
require('./config/passport')(passport)
const auth = require('./routes/auth')

//Keys
const keys = require('./config/keys')
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err))



const app = express()


app.get('/', (req, res) => {
        res.send('Working')
    })
    //Middlewares
app.use(cokkieparser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())

//global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

app.use('/auth', auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listen on port ${port}`))