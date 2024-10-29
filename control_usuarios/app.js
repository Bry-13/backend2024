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

app.put("/usuarios/:id", (req,res) => {
  const {nombre, apellidos, email} = req.body;
  const id = +req.params.id;
    
    if (!nombre || !apellidos || !email) {
      res.status(404).send({ error: "Todos los campos (nombre, apellidos, email) son obligatorios" });
      return;
    }
    if(isNaN(+id)) {
      res.status(400).send({error: "El id debe ser número"});
      return
      };
    
      const usuario = usuarios.find((usuario) => usuario.id === +id);
    
      if(usuario === undefined){
        res.status(400).send({error: `El usuario con id ${id} no existe`});
        return;
      };

  const emailExisteEnOtroUsuario = usuarios.find((u) => u.email === email && u.id !== id);
    
  if (emailExisteEnOtroUsuario) {
      console.log("El email ya existe en otro usuario");
      res.status(400).send({ error: "El email ya existe en otro usuario" });
      return;
  }

  // Actualización de datos de usuario
  usuario.nombre = nombre;
  usuario.apellidos = apellidos;
  usuario.email = email;
  console.log("Usuario actualizado:", usuario);
  res.status(200).send("El usuario se actualizó correctamente");
});
app.patch("/usuarios/:id", (req,res) => {
  
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});