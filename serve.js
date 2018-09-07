const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express(); 

const selectAll = 'SELECT * FROM produtos';

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'Loja'
});

connection.connect(err =>{
    if(err){
        return err;
    }
})

app.use(cors());

app.get('/',(req,res) => {
    res.send('Hello')
});

app.get('/produtos/add',(req,res) => {
    const {nome,preco} = req.query;
    const insert = `INSERT INTO produtos (nome_produto,preco) values ('${nome}',${preco})`;
    connection.query(insert,(err,results) => {
        if(err){
            return res.send(err)
        }else{
            return res.send("add com sucesso");
        }
    });
})

app.get('/produtos/delete',(req,res) => {
    const {id} = req.query;
    const deletar = `DELETE FROM produtos WHERE id = ${id}`;
    connection.query(deletar,(err,results) => {
        if(err){
            return res.send(err)
        }else{
            return res.send("removido com sucesso");
        }
    });
})

app.get('/produtos/update',(req,res) => {
    const {id,nome,preco} = req.query;
    const update = ` UPDATE produtos SET nome_produto = '${nome}' ,preco = ${preco} WHERE id = ${id}`;
    connection.query(update,(err,results) => {
        if(err){
            return res.send(err)
        }else{
            return res.send("Atualizado com sucesso");
        }
    });
})

app.get('/produtos',(req,res) => {
    connection.query(selectAll,(err,results) => {
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`);
});