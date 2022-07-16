const express = require('express')
const app=express();
const mysql=require('mysql')
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"loginsystem"
});



app.post('/register',(req,res)=>{

  const username =req.body.username;
  console.log(username);
  const password=req.body.password;

  db.query(
    "INSERT INTO user (username,password) VALUES (?,?)",
  [username,password],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("values inserted")
    };
  }
  )
})

app.get('/getuser',(req,res)=>{
  db.query(
    'select * from loginsystem.user',(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  )
})

app.put('/update/username',(req,res)=>{
  const username=req.body.username;
  const id=req.body.id;

  db.query(
    `UPDATE user SET username='${username}' WHERE id=${id}`,[username,id],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    }
  );
})

app.put("/update/password",(req,res)=>{
  const password=req.body.password;
  const id=req.body.id;
  db.query(
    `UPDATE user SET password='${password}' WHERE id=${id}`,[password,id],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    }
  );
});

app.delete('/delete/:id',(req,res)=>{
  console.log(req.params.id);
  const id=req.params.id
  db.query(
    "DELETE FROM user WHERE id = ?",id,(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result)
      }
    }
  )
})

app.get('/', (req,res) => {
  res.json({message:"I am from api call"});
})
app.listen(3001,()=>{
  console.log('sever is running');
})