const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()
const PORT = 3000
const router = require('./routes/router.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const unDia = 1000 * 60 * 60 * 24


app.use(session({
  key: 'login-session',
  secret: '123456',
  saveUninitialized: false,
  cookie: {maxAge: unDia},
  resave: true,
}))

app.use(cookieParser())

app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended :false}))
app.use(express.static(path.join(__dirname, './public')))


app.use(methodOverride())
app.use((err, req, res, next)=> {
  console.error(err.stack)
  res.status(500).send("Sokmething broke!")
} )
app.listen(PORT, ()=>{console.log('listen on port', PORT)})
router.routes(app)