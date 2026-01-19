const mongoose = require('mongoose')

async function connectmongoDB(url){
    return await mongoose.connect(url)
}

module.exports={
    connectmongoDB
}