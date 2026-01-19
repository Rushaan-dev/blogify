const express = require('express')
const {handlePostcomment,handleGetrequestedBlog,handleGetAddBlogPage,handleaddnewblog} = require('../controllers/blogs')
const upload = require('../middlewares/upload')


const router = express.Router();

router.route('/addblog')
.get(handleGetAddBlogPage)
.post(upload.single('blogimage'),handleaddnewblog)
router.get('/:id',handleGetrequestedBlog)

router.post('/comment/:id',handlePostcomment)   

module.exports=router