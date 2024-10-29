const express = require("express");

const app = express();

app.use(express.json());

const usuarios = [
  { id: 1,
    nombre: "Bryan",
    apellidos: "Morales",
    email: "bryan.0702mc@gmail.com",
  },

  { id: 2,
    nombre: "Sergio",
    apellidos: "Cervantes",
    email: "cervantes247@gmail.com",
  },
];

app.get("/usuarios",(req,res)=>{
    
  res.status(200).send(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const {id} = req.params;
  
  if(isNaN(+id)) {
  res.status(400).send({error: "El id debe ser número"});
  return
  };


  const usuario = usuarios.find((usuario) => usuario.id === +id);

  if(usuario === undefined){
    res.status(400).send({error: `El usuario con id ${id} no existe`});
    return;
  };
  
  res.status(200).send(usuario);

});

app.post("/usuarios",(req, res) => {
  const {nombre, apellidos, email} = req.body;

    
    if (!nombre || !apellidos || !email) {
      res.status(404).send({ error: "Todos los campos (nombre, apellidos, email) son obligatorios" });
      return;
    }
 
  const emailE = usuarios.find((usuario) => usuario.email === email);
  if (emailE) {
    res.status(400).send({ error: "El correo electrónico ya está registrado" });
    return;
  }
  
  usuarios.push({id: usuarios.length +1, nombre, apellidos, email});
  
  
  res.status(201).send("El usuario se agregó correctamente");

});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});