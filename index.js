const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set ("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"malik sb",
        content :"this is my first content"
    },
    {
        id:uuidv4(),
        username:"malik Zohaib",
        content :"this is my second content"
    },
    {
        id:uuidv4(),
        username:"Hafiz sb",
        content :"this is my third content"
    },
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4()
    posts.push({id,username,content})
    res.redirect("/posts")
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) =>
        id === p.id
    );
    res.render("show.ejs",{post})

})

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) =>
    id === p.id
    );
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res) =>{
    let {id}=req.params;
    let post = posts.find(
        (p)=>
        id===p.id
    );
    res.render("edit.ejs" , {post});
})
app.listen(PORT,()=>{
    console.log("Listening on port 8000");
})