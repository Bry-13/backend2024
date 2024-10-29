const express = require('express'); 

const app = express();

//GET Obtener información
app.get("/", (req, res) => {
    res.status(3000).send("Hola desde GET")
});

//POST Crear nuevo recurso
app.post("/", (req, res) => {
    res.status(3000).send("Hola desde POST")
});

//PUT Actualizar recurso
app.put("/", (req, res) => {
    res.status(3000).send("Hola desde PUT")
});

//PATCH Actualizar recurso parcialmente
app.patch("/", (req, res) => {
    res.status(3000).send("Hola desde PATCH")
});

//DELETE Eliminar recurso
app.delete(3000, (req, res) => {
    res.status(3000).send("Hola desde DELETE")
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});