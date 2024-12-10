const {request, response} = require('express');
const pool = require('../db/connection');
const pokemonsModel = require('../models/pokemons');

const getAllPokemons = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const pokemons = await conn.query(pokemonsModel.getAll);
        res.send(pokemons);
    } catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
}

const getPokemonById = async (req = request, res = response) => {
    const {id} = req.params;

    if(isNaN(id)){
        res.status(400)
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();
        const [pokemon] = await conn.query(pokemonsModel.getById, [id]);

        if(!pokemon){
            res.status(400).send({message: 'Pokemon not found'});
            return;
        }

    res.json(pokemon);
    }catch(err){
        res.status(500).json(err);
        return;
    }finally{
        if(conn) conn.end();
    }
    
}

const get3RandomPokemons = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const pokemons = await conn.query(pokemonsModel.get3Random);
        res.send(pokemons);
    } catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
}

const createPokemon = async (req = request, res = response) => {
    const { name, image } = req.body;

    if (!name || !image) {
        res.status(400).send({ message: "Missing required fields: name or image" });
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const [pokemon_existing] = await conn.query(pokemonsModel.getExisting, [name, image]);
        if (pokemon_existing) {
            res.status(409).send({ message: "Name or image already exists" });
            return;
        }

        const newPokemon = await conn.query(pokemonsModel.addPokemon, [name, image]);

        if(newPokemon.affectedRows === 0){
            res.status(500).send({message: 'Error adding pokemon'});
            return;
        }
        res.status(201).send({message: 'Pokemon created successfully'});
        return; 
    }catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
};

const updatePokemon = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, image } = req.body;

    if (isNaN(id)) {
        res.status(400).send({ message: 'Invalid ID' });
        return;
    }
    if (!name || !image) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const [pokemon] = await conn.query(pokemonsModel.getById, [id]);
        if (!pokemon) {
            res.status(404).send({ message: 'Pokemon nit found' });
            return;
        }

        const [pokemon_existing] = await conn.query(pokemonsModel.pokemonvalid, [name, image, id]);
        if (pokemon_existing) {
            res.status(409).send({ message: 'Name or image already exists' });
            return;
        }

        const updatedPokemon = await conn.query(pokemonsModel.editPokemon,[name, image, id]);
        if (updatedPokemon.affectedRows === 0) {
            res.status(500).send({ message: 'Pokemon not found' });
            return;
        }

        res.send({ message: 'Pokemon updated successfully' });
    } catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
};

const deletePokemon = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send({ message: 'Invalid ID' });
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const [pokemon] = await conn.query(pokemonsModel.getById, [id]);
        if (!pokemon) {
            res.status(404).send({ message: "Pokemon not found" });
            return;
        }
        
        const deletedPokemon = await conn.query(pokemonsModel.eliminarPokemon, [id]);
        if (deletedPokemon.affectedRows === 0) {
            res.status(500).send({ message: 'Error deleting user' });
            return;
        }

        res.send({ message: "Pokemon deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
        return;
    } finally {
        if (conn) conn.end();
    }
};


module.exports = {
    getAllPokemons,
    getPokemonById,
    get3RandomPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
}