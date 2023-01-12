require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require ('cors')
const express = require ('express')
const mongoose = require('mongoose')
const journalRoutes = require('./routes/journals')
const userRoutes = require('./routes/user')

// express app 
const app = express()

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/journals', journalRoutes)
app.use('/api/user', userRoutes)


//db connect 
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected and Server running!')
        })
    })
    .catch((error) => {
        console.log(error)
    })



