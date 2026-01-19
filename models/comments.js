const mongoose=require('mongoose')

const commentsSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
    },
    postedonblog:{
        type:mongoose.Schema.ObjectId,
        ref:'blogs',
    }
},{timestamps:true})

const Comment = mongoose.model('comment',commentsSchema)

module.exports=Comment