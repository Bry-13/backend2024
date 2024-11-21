const {request, response} = require('express');
const bcrypt = require('bcrypt')
const pool = require('../db/connection');
const { usersQueries } = require('../models/users');

const saltRounds = 10;
//const users = [
  //{id: 1, name: 'John Doe'},
  //{id: 2, name: 'Jane Doe'},
  //{id: 3, name: 'Bob Smith'},
//];

const getAllUsers = async (req = request, res = response) =>{
    let conn;
    try{
        conn = await pool.getConnection();
        const users = await conn.query(usersQueries.getAll);

        res.send(users);
    }catch(error){
        res.status(500).send(error);
        return;
    }finally{
        if (conn) conn.end();
    }
}


const getUserById = async (req = request, res= response) => {
  const {id} = req.params;

  if(isNaN(id)){
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getById, [+ID]);
    
    if(user.length === 0){
      res.status(404).send('User not found');
      return;
    } 
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    return;
  }finally {
    if (conn) conn.end();
  }
}

// Crear un nuevo usuario
const addUser = async (req = request, res = response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).send("Bad request. The Name field is missing.");
      return; 
    }
        
let conn;  
  try{
    conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getByUsername, [username]);

    if(user.length > 0 ){
      res.status(409).send('Username already exits');
      return;
    }
    const hashPasssword = await bcrypt.hash(password, saltRounds);

    const newUser = await conn.query(usersQueries.create, [username, hashPasssword, email]);
    if(newUser.affectedRows === 0){
      res.status(500).send('User could not be created');
      return;
    }

    res.status(201).send("User created succesfully"); 

  }catch (error){
    res.status(500).send(error);
    return;
  }finally{
    if (conn) conn.end();
  }
};

const loginUser = async (req = request, res = response) =>{
  const {username, password} = req.body;

  if(!username || !password){
    res.status(400).send('Username and Password are mandatory!');
    return;
  }

  let conn;
  try{
    conn = await pool.getConnection();

    const user = await conn.query(usersQueries.getByUsername,[username]);
    if(user.length === 0){
      res.status(400).send('Bad username or password');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if(!passwordMatch){
      res.status(403).send('Bad username or password');
      return;
    }
    res.send('Loged in!');
  }catch(error){
    res.status(500).send(error);
  }finally{
    if(conn) conn.end();
  }
}

// Actualizar datos de un usuario
const updateUser = async (req = request, res = response) => {
  const {id} = req.params;
  const {username} = req.body;

  if(isNaN(id) || !username){
    res.status(400).send('Invalid request');
    return;
  }

  let conn;  
  try{
    conn = await pool.getConnection();

  const user = await conn.query(usersQueries.getById,[+id]);
  if (user.length === 0) {
    res.status(404).send('User not found');
    return;
  }

  const result = await conn.query(usersQueries.update,[username,+id]);
  if (result.affectedRows === 0) {
    res.status(500).send('not be updaed');
    return;
  }

  res.send('User updated');
}catch(error){
  res.status(500).send(error);
}finally{
  if (conn) conn.end();
}
};

//Eliminar un usuario
const deleteUser = async (req = request, res = response) => {
  const {id} = req.params;

  let coon;
  try{
    conn = await pool.getConnection();
    
    const user = await conn.query(usersQueries.getById,[+id]);
    if (user.length ===0){
      res.status(404).send('User not found')
      return;
    }

    const deleteuser = await conn.query(usersQueries.delete, [+id]);
    if (deleteuser.affectedRows === 0) {
      res.status(500).send('User could not be deleted');
      return;
    }

    res.send("User deleted succefully");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};
  
module.exports = { getAllUsers, getUserById, addUser, loginUser, updateUser, deleteUser}; 