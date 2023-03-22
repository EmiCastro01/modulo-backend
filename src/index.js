const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
const router = require('./routes/router.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')

app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended :false}))
app.use(express.static(path.join(__dirname, './public')))

app.listen(PORT, ()=>{console.log('listen on port', PORT)})
router.routes(app)
app.use(methodOverride())
app.use((err, req, res, next)=> {
  console.error(err.stack)
  res.status(500).send("Sokmething broke!")
} )
