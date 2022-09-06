const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// Express App Configurations
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))

const toyRoutes = require('./api/toy/toy.controller.js')
app.use('/api/toy', toyRoutes)

// const userRoutes = require('./api/user/user.controller.js')
// app.use('/api/user', userRoutes)

app.listen(3030, () => console.log('Server ready at port 3030!'))