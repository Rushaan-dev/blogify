const {mongoose} = require('mongoose')

const blogSchema = mongoose.Schema({
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    content:{
        type:String,
        required:true,
    },
    blogimage:{
        type:String,
    },
    title:{
        type:String,
        required:true
    }
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema)

module.exports=Blog