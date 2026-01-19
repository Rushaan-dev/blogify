const {Router} = require('express')
const {handleUserlogout,handleUsersignup,handleUsersignin,giveUserSigninpage,giveUserSignuppage,giveUserhomepage} = require('../controllers/user')



const router = Router()

router.get('/',giveUserhomepage)

router.route('/signin')
.get(giveUserSigninpage)
.post(handleUsersignin)

router.route('/signup')
.get(giveUserSignuppage)
.post(handleUsersignup)

router.post('/logout',handleUserlogout)

module.exports=router