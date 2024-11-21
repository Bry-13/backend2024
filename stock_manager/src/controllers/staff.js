const { request, response } = require('express');
const pool = require('../db/connection');
const { staffQueries } = require('../models/staff');

// Obtener todos los registros de staff
const getAllStaff = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getAllStaff);
        res.send(staff);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Obtener un registro de staff por ID
const getStaffById = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getById, [+id]);
        if (staff.length === 0) {
            res.status(404).send('Staff member not found');
            return;
        }
        res.send(staff[0]);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Agregar un nuevo registro a staff
const addStaff = async (req = request, res = response) => {
    const { first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id } = req.body;

    if (!first_name || !last_name || !birth_date || !gender || !phone_number || !email || !address || is_active === undefined || !user_id) {
        res.status(400).send('All fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const foreignExists = await conn.query('SELECT * FROM users WHERE id = ?', [user_id]);
        if (foreignExists.length === 0) {
            res.status(400).send('User ID does not exist');
            return;
        }

        const result = await conn.query(staffQueries.create, [first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id]);
        if (result.affectedRows === 0) {
            res.status(500).send('Staff member could not be created');
            return;
        }

        res.status(201).send("Staff member created successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Actualizar un registro existente en staff
const updateStaff = async (req = request, res = response) => {
    const { id } = req.params;
    const { first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id } = req.body;

    if (isNaN(id) || !first_name || !last_name || !birth_date || !gender || !phone_number || !email || !address || is_active === undefined || !user_id) {
        res.status(400).send('All fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();

        // Verificar que el registro existe
        const staffExists = await conn.query(staffQueries.getById, [+id]);
        if (staffExists.length === 0) {
            res.status(404).send('Staff member not found');
            return;
        }

        // Verificar que user_id existe en la tabla referenciada
        const foreignExists = await conn.query('SELECT * FROM users WHERE id = ?', [user_id]);
        if (foreignExists.length === 0) {
            res.status(400).send('User ID does not exist');
            return;
        }

        const result = await conn.query(staffQueries.update, [first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id, +id]);
        if (result.affectedRows === 0) {
            res.status(500).send('Staff member could not be updated');
            return;
        }

        res.send('Staff member updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Eliminar un registro de staff
const deleteStaff = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staffExists = await conn.query(staffQueries.getById, [+id]);
        if (staffExists.length === 0) {
            res.status(404).send('Staff member not found');
            return;
        }

        const result = await conn.query(staffQueries.delete, [+id]);
        if (result.affectedRows === 0) {
            res.status(500).send('Staff member could not be deleted');
            return;
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = { getAllStaff, getStaffById, addStaff, updateStaff, deleteStaff };