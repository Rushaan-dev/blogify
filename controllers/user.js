const User = require('../models/user')
const { setUser, getUser } = require('../authServices/auth')
const Blog = require('../models/blog')

function giveUserSigninpage(req, res) {
    res.render('signin')
}

function giveUserSignuppage(req, res) {
    res.render('signup')
}
async function giveUserhomepage(req, res) {
    const allblogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate('createdby');
    res.render('home',{blogs:allblogs})
}
async function handleUsersignup(req, res) {
    const { fullname, email, password } = req.body
    const user = await User.create({
        fullname,
        email,
        password
    })
    if (!user) { return res.json('invalid') }
    res.render('signin')
}

async function handleUsersignin(req, res) {
    const flag = 1;
    try {
        const { email, password } = req.body
        const user = await User.matchpassword(email, password)
        const token = setUser(user)
        const loggedinuser = getUser(token)
        //console.log(user)
        res.cookie('uuid', token, {
                httpOnly: true,
                secure: true,      // use true in production (HTTPS)
                sameSite: "Strict" // or "Lax" to protect against CSRF
            })
            return res.redirect('/')
    }
    catch (err) {
        return res.render('signin', {
            flag,
        })
    }
}

function handleUserlogout(req, res) {
    const token = req.cookies.uuid
    res.clearCookie("uuid", {
        httpOnly: true,
        secure: true,       // only for HTTPS
        sameSite: "Strict"  // or "Lax", depending on your setup
    });
    return res.redirect('/signin')
}

module.exports = {
    giveUserSignuppage,
    giveUserSigninpage,
    giveUserhomepage,
    handleUsersignin,
    handleUsersignup,
    handleUserlogout
}