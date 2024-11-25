const { request, response } = require('express');
const pool = require('../db/connection');
const { suppliersQueries } = require('../models/suppliers');

// Obtener todos los registros de suppliers
const getAllSupp = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const suppliers = await conn.query(suppliersQueries.getAllSupp, [1]);
        res.send(suppliers);
    }
    catch (error) {
        res.status(500).send(error);
    } 
    finally {
        if (conn) conn.end();
    }
};

// Obtener un registro de supplier por RFC
const getSuppByRfc = async (req = request, res = response) => {
    const { rfc } = req.params;
    //verificamos que el rfc es valido
    if (!rfc || typeof rfc !== 'string' ) {
        res.status(400).send('Invalid RFC');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const suppliers = await conn.query(suppliersQueries.getByRfc, [rfc]);
        if (suppliers.length === 0) {
            res.status(404).send('Supplier not found');
            return;
        }
        res.send(suppliers[0]);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Agregar un nuevo registro a supplier
const addSupp = async (req = request, res = response) => {
    const { rfc, name, description, phone_number, email, address, is_active } = req.body;
    if (!rfc || !name || !description || !phone_number || !email || !address || is_active === undefined ) {
        res.status(400).send('All fields are required');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(suppliersQueries.create, [rfc, name, description, phone_number, email, address, is_active]);
        if (result.affectedRows === 0) {
            res.status(500).send('Supplier could not be created');
            return;
        }
        res.status(201).send("Supplier created successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Actualizar un registro existente en supplier
const updateSuppByRfc = async (req = request, res = response) => {
    const { rfc } = req.params;
    const { name, description, phone_number, email, address, is_active } = req.body;
    if (!rfc || !name || !description || !phone_number || !email || !address || is_active === undefined) {
        res.status(400).send('All fields are required');
        return;
    }
    
    let conn;
    try {
        conn = await pool.getConnection();
        // Verificar que el registro existe
        const supplierExists = await conn.query(suppliersQueries.getByRfc, [rfc]);
        if (supplierExists.length === 0) {
            res.status(404).send('Supplier not found');
            return;
        }
  
        const result = await conn.query(suppliersQueries.updateByRfc, [ name, description, phone_number, email, address, is_active, rfc]);
        if (result.affectedRows === 0) {
            res.status(500).send('Supplier could not be updated');
            return;
        }
        res.send('Supplier updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
// Eliminar un registro de supplier
const deleteSupp = async (req = request, res = response) => {
    const { rfc } = req.params;
    if (!rfc || typeof rfc !== 'string') {
        res.status(400).send('Invalid RFC');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const supplierExists = await conn.query(suppliersQueries.getByRfc, [rfc]);
        if (supplierExists.length === 0) {
            res.status(404).send('Supplier not found');
            return;
        }

        const result = await conn.query(suppliersQueries.deleteSupp, [rfc]);
        if (result.affectedRows === 0) {
            res.status(500).send('Supplier could not be deleted');
            return;
        }
        res.send('Supplier deleted');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};
module.exports = { getAllSupp, getSuppByRfc, addSupp, updateSuppByRfc, deleteSupp };