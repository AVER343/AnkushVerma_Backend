const express =require('express')
const app =express()
const cors=require('cors')
const bodyParser=require('body-parser')
const PORT=5000||process.env.PORT
const ball = require('./routes/ball')
app.use(bodyParser.json())
app.use(cors())
app.use(ball)
app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`)
})