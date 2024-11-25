const {request, response} = require('express');

const pool = require('../db/connection');
const { productsQueries } = require('../models/products');

// Obtener todos los registros de products
const getAllProducts = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getAll); 
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Obtener un registro de products por ID
const getProductsById = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getById, [+id]);
        if (products.length === 0) {
            res.status(404).send('product not found');
            return;
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

//Crear un nuevo registro a products
const createProducts = async (req = request, res = response) => {
    const { product, description, stock, measurement_unit, price, discount } = req.body;
    if (!product || !description || !stock || !measurement_unit || !price || !discount) {
        res.status(400).send('All fields are required');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getByProduct, [product]);
        if (products.length > 0) {
            res.status(400).send('product already exists');
            return;
        }
        const newProducts = await conn.query(productsQueries.create, [product, description, stock, measurement_unit, price, discount]);
        
        if (newProducts.affectedRows === 0) {
            res.status(500).send('product could not be created');
            return;
        }
        res.status(201).send("product created successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Actualizar un registro existente en products
const updateProducts = async (req = request, res = response) => {
    const {id} = req.params;
    const {  product, description, stock, measurement_unit, price, discount } = req.body;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getById, [+id]);
        if (products.length === 0) {
            res.status(404).send('product not found');
            return;
        }
        const updateProducts= await conn.query(productsQueries.update,[ product, description, stock, measurement_unit, price, discount, +id]);
        if (updateProducts.affectedRows === 0) {
            res.status(500).send('product could not be updated');
            return;
        }
        res.status(200).send('product updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Eliminar un registro de products
const deleteProducts = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getById, [+id]);
        if (products.length === 0) {
            res.status(404).send('product not found');
            return;
        }
        const deleteProducts = await conn.query(productsQueries.delete, [+id]);
        if (deleteProducts.affectedRows === 0) {
            res.status(500).send('product could not be deleted');
            return;
        }
        res.send('product deleted');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts };