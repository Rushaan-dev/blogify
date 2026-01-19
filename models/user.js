const mongoose = require('mongoose')
const {createHmac,randomBytes} = require("crypto")

const secret = '@$uperman123'

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
        password:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    salt:{
        type:String,
    },
    profileimageUrl:{
        type:String,
        default:"/defaultpic/user.png"
    }
},{timestamps:true})


userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac('sha256',salt)
    .update(user.password)
    .digest('binary')

    this.salt = salt;
    this.password = hashedpassword
    next();
})

userSchema.static('matchpassword',async function(email,password){
    const user=await this.findOne({email})
    if(!user){throw new Error('User not found')}
    const salt = user.salt
    const hashedpassword = user.password
    const userProvidedHashedPassword = createHmac('sha256',salt)
    .update(password)
    .digest('binary')
    if(hashedpassword===userProvidedHashedPassword){
        return user
    }else{throw new Error('Incorrect Password')}

})

const User = mongoose.model('users',userSchema);

module.exports=User