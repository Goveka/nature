
const express= require("express");
const app=express();
const mongoose= require("mongoose");
const fs = require('fs');
const cors= require('cors');
const bodyParser= require('body-parser');
//const url= "mongodb://localhost:27017/test";
const url='mongodb+srv://Sizwenkala:sizwe123@cluster0.fejtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port= process.env.PORT || 9000
// setting up the template engine
app.set("view engine", "ejs");

// middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(express.static('public'));
app.use(cors())


// connecting to database
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})

const database = mongoose.connection
//checking if our connection to database was successful
database.on('error', (error)=>{
    console.log(error)
})
database.once('connected', ()=>{
    console.log("database connected")
})

// creating a new monngoose model
const Nature = mongoose.model('Nature', new mongoose.Schema({
    id: Number,
    likes: Number,
    downloads: Number,
    description: String,
    imgSrc: String,
    author: String
}));

// creating a new package
//const nature= new Nature({
  //  "id": 25,
  //  "likes": 0,
  //  "downloads": 0,
  //  "description": "white blossom",
  //  "imgSrc": "https://i.ibb.co/6D73Bph/pexels-j-lee-6843561.jpg",
  //  "author": "J lee"
//})
 //save to the database
//nature.save((err)=>{
 //   if(err) throw err;
 // console.log('item inserted to database');
//})


app.get('/', (req,res)=>{

    // using the mongoose find() method to query the database
Nature.find({}, (err, nature)=>{
    if(err){
        console.log(err)
    }else{
        res.render('home', {
            nature: nature
        })
    }
})

})

app.get('/admin', (req,res)=>{
    Nature.find({}, (err, nature)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin', {
                nature: nature
            })
        }
    })
})

// API endpoint that will allow to connect using fetch
app.get('/api/nature', (req,res)=>{
    Nature.find({}, (err,data)=>{
        if (err) return console.error(err);
        res.send(data);
    })
})

// Api endpoint for likes and downloads
//updating the likes on the database
app.post('/api/update-likes', (res,req)=>{
    const id= req.body.id;
     Nature.findOne({_id: id}, (err, object)=>{
         if (err) {
             res.sendStatus(500)
         }else {
             object.likes += 1;
             object.save(function(err){
                 if (err){
                     res.sendStatus(500)
                     console.error(err)
                 }else {
                     res.sendStatus(200)
                     console.log('updated');
                 }
             })
         }
     })
 })
 
 //updating downloads on the database
 app.post('/api/update-downloads', (req,res)=>{
     const id= req.body.id;
      Nature.findOne({_id: id}, (err, object)=>{
          if (err) {
              res.sendStatus(500)
          }else {
              object.downloads += 1;
              object.save(function(err){
                  if (err){
                      res.sendStatus(500)
                      console.error(err)
                  }else {
                      res.sendStatus(200)
                      console.log('updated');
                  }
              })
          }
      })
  })
 


app.post('/adding-to-database', (req,res)=>{

    // creating a new package
const nature= new Nature({
   "id": req.body.id,
   "likes": 0,
    "downloads": 0,
    "description": req.body.description,
    "imgSrc": req.body.imgSrc,
    "author": req.body.author 
})
 //save to the database
nature.save((err)=>{
    if(err) throw err;
  console.log('item inserted to database')
  res.send("items has been inserted");
}) 
})


//updating the likes on the database
app.post('/update-likes', (req,res)=>{
   const id= req.body.id;
    Nature.findOne({_id: id}, (err, object)=>{
        if (err) {
            res.sendStatus(500)
        }else {
            object.likes += 1;
            object.save(function(err){
                if (err){
                    res.sendStatus(500)
                    console.error(err)
                }else {
                    res.sendStatus(200)
                    console.log('updated');
                }
            })
        }
    })
})

//updating downloads on the database
app.post('/update-downloads', (req,res)=>{
    const id= req.body.id;
     Nature.findOne({_id: id}, (err, object)=>{
         if (err) {
             res.sendStatus(500)
         }else {
             object.downloads += 1;
             object.save(function(err){
                 if (err){
                     res.sendStatus(500)
                     console.error(err)
                 }else {
                     res.sendStatus(200)
                     console.log('updated');
                 }
             })
         }
     })
 })
// deleting document from the database
app.post('/delete-objects', (req,res)=>{
    const id = req.body.id;
    Nature.deleteOne({_id: id}, (err)=>{
        if (err) throw err;
            console.log('item deleted')
        })
    })




app.listen(port, (req,res)=>{
    console.log("app is running on port 9000");
});