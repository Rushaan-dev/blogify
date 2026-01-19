const jwt = require("jsonwebtoken")
const tokenSecret = 'Token123^%@)*sec'

function setUser(user){
    return jwt.sign({
        username:user.fullname,
        email:user.email,
        id:user._id,
        profileimageUrl:user.profileimageUrl
    },tokenSecret)
}

function getUser(token){
    if(!token){return null}
    return jwt.verify(token,tokenSecret)
}

module.exports={
    setUser,
    getUser
}
