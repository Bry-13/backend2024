const {request , response} =  require('express');

const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'Bob Smith'},
];

const getAll= (req = request, res= response) => {
    res.send(users); 
}

const getById= (req = request, res= response) => {
    const {id} = req.params;

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }

    const user = users.find(user => user.id === +id);

    if(!user){
        res.status(404).send('User not found');
        return;
    } 

    res.send(user);
}

// Agregar un nuevo usuario
    const addUser = (req = request, res = response) => {
        const { name } = req.body;

        if (!name) {
        res.status(400).send('Name is required');
        return;
        }

        const newUser = { id: users.length + 1, name };
        users.push(newUser);
        res.status(201).send(newUser);
    };
  
  // Actualizar un usuario existente
    const updateUser = (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
  
    const user = users.find((user) => user.id === +id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
  
    if (!name) {
      res.status(400).send('Name is required');
      return;
    }
  
    user.name = name;
    res.send(user);
  };
  
    // Eliminar un usuario
    const deleteUser = (req = request, res = response) => {
    const { id } = req.params;
  
    if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
  
    const index = users.findIndex((user) => user.id === +id);
    if (index === -1) {
      res.status(404).send('User not found');
      return;
    }
  
    users.splice(index, 1);
    res.status(204).send(); // 204 (No Content) Indica éxito sin contenido adicional
  };
  
  module.exports = { getAll, getById, addUser, updateUser, deleteUser }; 