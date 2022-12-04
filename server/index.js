const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "konorat",
    database: "app_postagens",
})

app.use(express.json())
app.use(cors())

app.post('/registerPost', (req,res) => {
    const { title } = req.body
    const { content } = req.body

    let sql = "INSERT INTO postagens (title, content) values ( ? , ?)"

    db.query( sql, [title, content], (err, result) =>{
            if (err) console.log(err)
            else res.send(result)
        }
    )
})

app.post("/search", (req, res) => {
    const { title } = req.body;
    const { content } = req.body;
      
    db.query("SELECT * from postagens WHERE title = ? AND content = ? ", [title, content], (err, result) => {
      if (err) res.send(err)
      res.send(result)
    });
  });


app.get('/getPosts', (req,res) => {
    
    let sql = "SELECT * FROM postagens"

    db.query( sql, (err,result) => {
        if (err) console.log(err)
        else res.send(result)
    })
})

app.put("/editPost", (req,res)=>{
    const { id } = req.body
    const { title } = req.body
    const { content } = req.body
    
    let sql = "UPDATE postagens SET title = ?, content = ? WHERE id_post = ? "

    db.query( sql, [title , content, id], (err,result)=>{
        if (err) console.log(err)
        else res.send(result)
    })
})


app.delete("/deletePost/:id", (req,res)=>{
    const {id} = req.params   
 
    let sql = "DELETE FROM postagens WHERE id_post = ?"

    db.query(sql, [id], (err,result)=>{
        if (err){
            console.log(err)
        } 
        else res.send(result)
    })
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})