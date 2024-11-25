const {request, response} = require('express');
//const bcrypt=require('bcrypt');
const pool = require('../db/connection');
const { products_suppliersQueries } = require('../models/products_suppliers');
//const saltRounds=
// Obtener todos los registros de products_suppliers
const getAllProducts_suppliers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const products_suppliers = await conn.query(products_suppliersQueries.getAll); //getAllStaff
        res.send(products_suppliers);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
// Obtener un registro de products_suppliers por ID
const getProducts_suppliersById = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products_suppliersMember = await conn.query(products_suppliersQueries.getById, [+id]);
        if (products_suppliersMember.length === 0) {
            res.status(404).send('products_suppliers member not found');
            return;
        }
        res.send(products_suppliersMember);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
//Crear un nuevo registro a products_suppliers
const createProducts_suppliers = async (req = request, res = response) => {
    const { 
    product_id, supplier_rfc, notes } = req.body;
    if (!product_id || !supplier_rfc || !notes
    ) {
        res.status(400).send('All fields are required');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products_suppliersMember = await conn.query(products_suppliersQueries.getByProduct_id, [product_id]);
        if (products_suppliersMember.length > 0) {
            res.status(400).send('product_id already exists');
            return;
        }
        const newProducts_suppliersMember = await conn.query(products_suppliersQueries.create, [product_id, supplier_rfc, notes]);
        
        if (newProducts_suppliersMember.affectedRows === 0) {
            res.status(500).send('products_suppliers member could not be created');
            return;
        }
        res.status(201).send("products_suppliers member created successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
// Actualizar un registro existente en products_suppliers
const updateProducts_suppliers = async (req = request, res = response) => {
    const {id} = req.params;
    const { product_id, supplier_rfc, notes } = req.body;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products_suppliersMember = await conn.query(products_suppliersQueries.getById, [+id]);
        if (products_suppliersMember.length === 0) {
            res.status(404).send('products_suppliers member not found');
            return;
        }
        const updateProducts_suppliersMember= await conn.query(products_suppliersQueries.update,[product_id, supplier_rfc, notes, +id]);
        if (updateProducts_suppliersMember.affectedRows === 0) {
            res.status(500).send('products_suppliers member could not be updated');
            return;
        }
        res.status(200).send('products_suppliers member updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
// Eliminar un registro de products_suppliers
const deleteProducts_suppliers = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const products_suppliersMember = await conn.query(products_suppliersQueries.getById, [+id]);
        if (products_suppliersMember.length === 0) {
            res.status(404).send('products_suppliers member not found');
            return;
        }
        const deleteProducts_suppliersMember = await conn.query(products_suppliersQueries.delete, [+id]);
        if (deleteProducts_suppliersMember.affectedRows === 0) {
            res.status(500).send('products_suppliers member could not be deleted');
            return;
        }
        res.send('products_suppliers member deleted');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
module.exports = { getAllProducts_suppliers, getProducts_suppliersById, createProducts_suppliers, updateProducts_suppliers, deleteProducts_suppliers };