const { getUser } = require('../authServices/auth')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')

function handleGetAddBlogPage(req, res) {
    res.render('addblogPage')
}

async function handleaddnewblog(req, res) {
    //console.log(req.file)
    const token = req.cookies.uuid
    const user = getUser(token)
    const loggedinuser =await User.findOne({email:user.email})
    if(!user){return res.status(401).render('signin')}
    const blog=await Blog.create({
        createdby:loggedinuser,
        blogimage:req.file.filename,
        content:req.body.content,
        title:req.body.title
    })
    if(!blog){return res.json('error creating blog')}
    return res.redirect(`/blog/${blog._id}`)
}
async function handleGetrequestedBlog(req,res){
    const blogId = req.params.id
    const blog = await Blog.findOne({_id:blogId})
    const comment = await Comment.find({postedonblog:req.params.id})
                                 .populate('postedby')
    const token = req.cookies.uuid
    const user = getUser(token)                                 
    return res.render('requestedBlog',{
        blog,
        user,
        comment
    })
}

async function handlePostcomment(req,res){
    const blogid = req.body.blogid
    const content = req.body.commentcontent;
    const token = req.cookies.uuid
    const user = getUser(token)
    console.log(req.params.id)
    const comment = await Comment.create({
        content,
        postedby:user.id,
        postedonblog:req.params.id
    })
    res.redirect(`/blog/${req.params.id}`)
}

module.exports = {
    handleGetAddBlogPage,
    handleaddnewblog,
    handleGetrequestedBlog,
    handlePostcomment
}