const express = require("express");
const app = express();
const path = require("path");
const{v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");


const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

let posts=[{
             id:uuidv4(),username:"pradee",
            content:"currently persuing 2nd year eng"
},
{
      id:uuidv4(),username:"Nitheesh",content:"ncc caddet"
},{
      id:uuidv4(),username:"gowtham",content:"OOPS! i belong to jss eng"
}]

app.get("/postss",(req,res)=>{
   res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("get.ejs");
})

app.post("/posts",(req,res)=>{
  let{username,content}=req.body;
  let id=uuidv4();
  posts.push({id,username,content});
  
  res.redirect("/postss");
 

})

app.get("/posts/:id",(req,res)=>{
 let{id}=req.params;
let  post = posts.find((p) => p.id === id);

 res.render("show.ejs",{post});
})


app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
     let  post = posts.find((p) => p.id === id);
     post.content=newContent;
    console.log(post);
   
    res.redirect("/postss");
})

app.get("/posts/:id/edit",(req,res)=>{
  let{id}=req.params;
    let  post = posts.find((p) => p.id === id);
      
  
    res.render("update.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=> p.id!==id);
    res.redirect("/postss");
  
})
app.listen(port, () => {
    console.log(`The new server port is ${port}`);
});