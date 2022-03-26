const path = require('path')
require('dotenv').config()                              // environment variables
const mongoose = require('mongoose')                    // MONGOOSE

// Setting EXPRESS
const express = require('express')                      // EXPRESS
const app = express()                                   // init Express App
// Body Parser Middleware
app.use(express.json())                                 // accepts RAW JSON data submitions
app.use(express.urlencoded({extended: true}))           // accepts form submitions

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const PORT = process.env.PORT                           // setting PORT

app.use(express.static(path.join(__dirname, 'public'))) // setting PUBLIC Dir

// Setting Template Engine - Handlebars
const exphbs = require('express-handlebars')            // Handlebars
const engine = exphbs.engine({defaultLayout: 'main'})   // handlebars engine
app.engine('handlebars',engine)                         
app.set('view engine', 'handlebars')                    // set view engine
app.set('views','./views')                              // Views folder

// Setting Routes

const userVerify = require('./middleware/userAuthVerify')
app.use('*',userVerify)

const sitePageRoute = require('./routes/sitePageRoute')
app.use('/', sitePageRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)

const getStartedRoute = require('./routes/getStartedRoute')
app.use('/get-started',getStartedRoute)

const userAuthRoute = require('./routes/userAuthRoute')
app.use('/auth', userAuthRoute)

const purchaseRoute = require('./routes/purchaseRoute')
app.use('/purchase', purchaseRoute)

const historyRoute = require('./routes/historyRoute')
app.use('/history',historyRoute)

const courseRoute = require('./routes/courseRoute')
app.use('/courses',courseRoute)

const logoutRoute = require('./routes/logoutRoute')
app.use('/logout',logoutRoute)

// Connecting DB
mongoose.connect(process.env.DB_URI)
    .then((result)=>{
        console.log('DB Connection successful')
        app.listen(PORT, ()=> console.log(
            `Server running on port:\n http://127.0.0.1:${PORT}`
        ))
    })
    .catch((err)=> console.error(err))
