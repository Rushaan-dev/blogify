const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const {connectmongoDB} = require('./connection')
const { getUser } = require('./authServices/auth')
require('dotenv').config();


const userRoute = require('./routes/user')
const blogRoute = require('./routes/blogs')

connectmongoDB(process.env.MONGO_URL)
.then(()=>{console.log('mongodb connected')})

const app=express();
const PORT = process.env.PORT || 8000;


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use((req,res,next)=>{
    const token = req.cookies.uuid;
    const loggedinuser = getUser(token)
    res.locals.loggedinuser = loggedinuser||null
    //console.log(user)
    next();
})

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use('/',userRoute)
app.use('/blog',blogRoute)


app.listen(PORT,(err)=>{console.log(`server listening on port:${PORT}`)})