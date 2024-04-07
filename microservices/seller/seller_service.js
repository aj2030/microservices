/**
 * @fileoverview This file contains the implementation of a SELLER service using Express.js and MySQL.
 * It provides various routes for fetching, creating, updating, and deleting SELLER data from the database.
 * The SELLER data is stored in a MySQL database and accessed using a connection pool.
 * The server listens on port 3000.
 * @module seller_service
 */

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('../config/config');

// Create an instance of Express
const app = express();

// Create a connection pool to the database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.getSQLDBParameters().server,
    user: config.getSQLDBParameters().user,
    password: config.getSQLDBParameters().password,
    database: config.getSQLDBParameters().database,
    port: config.getSQLDBParameters().port
});


// Define a GET route for fetching SELLER data
app.get('/sellers', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the SELLER table
        connection.query('SELECT * FROM SELLER', (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json(results);
        });
    });
});

// Define a GET route for fetching a single SELLER
app.get('/sellers/:id', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the SELLER table for a single SELLER
        connection.query('SELECT * FROM SELLER WHERE id = ?', [req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

// Define a GET route to fetch a SELLER by first name
app.get('/sellers/first-name/:firstName', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Query the SELLER table for a SELLER by first name
        connection.query('SELECT * FROM SELLER WHERE f_name = ?', [req.params.firstName], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
            res.json(results);
        });
    });
});

// Define a GET route to fetch a SELLER by last name
app.get('/sellers/last-name/:lastName', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Query the SELLER table for a SELLER by last name
        connection.query('SELECT * FROM SELLER WHERE l_name = ?', [req.params.lastName], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
            res.json(results);
        });
    });
});

// Define a GET route to fetch a SELLER by email
app.get('/sellers/email/:email', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Query the SELLER table for a SELLER by email
        connection.query('SELECT * FROM SELLER WHERE email = ?', [req.params.email], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
            res.json(results);
        });
    });
});

// Define a GET route to fetch a SELLER by phone number
app.get('/sellers/phone/:phoneNumber', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Query the SELLER table for a SELLER by phone number
        connection.query('SELECT * FROM SELLER WHERE phone = ?', [req.params.phoneNumber], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.error('Error querying the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
            res.json(results);
        });
    });
});

// Define a DELETE route for deleting a SELLER
app.delete('/sellers/:id', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Delete the SELLER from the SELLER table
        connection.query('DELETE FROM SELLER WHERE id = ?', [req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error deleting from the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json({ success: true });
        });
    });
});

// Define a POST route for creating a new SELLER
app.post('/sellers', bodyParser.json(), (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Insert a new SELLER into the SELLER table
        connection.query('INSERT INTO SELLER (f_name, l_name, email, phone) VALUES (?, ?, ?, ?)', [req.body.f_name, req.body.l_name, req.body.email, req.body.phone], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error inserting into the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json({ id: results.insertId });
        });
    });
});

// Define a PUT route for updating a SELLER
app.put('/sellers/:id', bodyParser.json(), (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Update the SELLER in the SELLER table
        connection.query('UPDATE SELLER SET f_name = ?, l_name = ?, email = ?, phone = ? WHERE id = ?', [req.body.f_name, req.body.l_name, req.body.email, req.body.phone, req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error updating the SELLER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json({ success: true });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});