var express = require('express')
var db =require('./config/Db')
var app=express();
var Post =require('./models/Post')
app.use(express.json())
var port =process.env.PORT || 5000;
db().then(()=>{
    console.log('Sucsessfully concted to db')
}).catch((err)=>{console.log('error')})

app.get('/api' ,(req ,res)=>{
    res.status(200).json({'message':'Api is working fine'})
})
// fetching all post
app.get('/api/posts' ,(req ,res)=>{
    Post.find({}).then((data)=>{
        console.log(data)
        res.status(200).json({data})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
})
// get  some  specefic post
app.get('/api/posts/:id' ,(req ,res)=>{
    let postid =req.params.id;
    Post.find({_id:postid}).then((data)=>{
        console.log(data)
        res.status(200).json({data})
    }).catch((err)=>{
        console.log(object)
        res.status(500).json({message:err})
    })

})
// create a post
app.post('/api/posts' ,(req ,res)=>{
    let newPost =new Post({
        title: req.body.title,
        description: req.body.description
    })
    newPost.save().then((data)=>{
        console.log(data)
        res.status(200).json({"message":'Post created sucsessfuly ',data})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
})
// update the specefic post
app.put('/api/posts/:id' ,(req ,res)=>{
    let postid =req.params.id;
    let newInfo ={
        title: req.body.title,
        description: req.body.description
    }
    Post.findByIdAndUpdate(postid, newInfo).then((data)=>{
        console.log(data)
        res.status(200).json({message:'post update sucessfuly ' ,data})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
    
})
// Deleted the specefic post
app.delete('/api/posts/:id' ,(req ,res)=>{
    let postid =req.params.id;
    
    Post.findByIdAndDelete(postid).then((data)=>{
        console.log(data)
        res.status(200).json({message:'post Deleted sucessfuly ' })
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
    
})





app.listen(port, (req, res)=>{
    console.log(`server running on port ${port}`)
})