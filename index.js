const express = require('express')
const { default: helmet } = require('helmet')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv').config()

const userRoutes = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log('mongodb connected'))

//mindlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))



app.use('/api/auth', authRoute)
app.use('/api/users',userRoutes)
app.use('/api/posts', postRoute)

app.listen(process.env.PORT || 4000, () =>
console.log(`server is running on port ${process.env.PORT}`))