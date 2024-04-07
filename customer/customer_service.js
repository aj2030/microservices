
/**
 * @file This file contains a simple example of a CUSTOMER service that fetches CUSTOMER data from a MySQL database.
 * @module customer_service
 */

// This is a simple example of a CUSTOMER service that fetches CUSTOMER data from a MySQL database.
const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const app = express();
const config = require('./config/config');

// Create a connection pool to the database
/**
 * MySQL connection pool.
 * @type {Object}
 */
const pool = mysql.createPool({   
    connectionLimit: 10,
    host: config.getSQLDBParameters().server,
    user: config.getSQLDBParameters().user,
    password: config.getSQLDBParameters().password,
    database: config.getSQLDBParameters().database,
    port: config.getSQLDBParameters().port
});

// Define a GET route for / resource
app.get('/shallow/health/check', (req, res) => {
    res.send('Health check for customer service is successful!');
});

// Define a GET route for / resource
app.get('/full/health/check', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Health check failuer' });
            return;
        }
        else{
            res.send('Health check for customer service is successful! Application is able to aquire DB connection.');
        }
    });

});

/**
 * GET route for fetching CUSTOMER data.
 * @name GET /customers
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER', (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json(results);
        });
    });
});

/**
 * GET route for fetching a specific CUSTOMER.
 * @name GET /customers/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/id/:id', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE id = ?', [req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * DELETE route for deleting a specific CUSTOMER.
 * @name DELETE /customers/:id
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.delete('/customers/:id', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Delete the CUSTOMER from the CUSTOMER table
        connection.query('DELETE FROM CUSTOMER WHERE id = ?', [req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error deleting from the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.status(204).end();
        });
    });
});

/**
 * GET route to fetch CUSTOMER data based on email.
 * @name GET /customers/email/:email
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/email/:email', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE email = ?', [req.params.email], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * GET route to fetch CUSTOMER data based on phone number.
 * @name GET /customers/phone/:phone
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/phone/:phone', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE phone = ?', [req.params.phone], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * GET route to fetch CUSTOMER data based on first name.
 * @name GET /customers/f_name/:f_name
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/f_name/:f_name', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE f_name = ?', [req.params.f_name], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * GET route to fetch CUSTOMER data based on last name.
 * @name GET /customers/l_name/:l_name
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/l_name/:l_name', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE l_name = ?', [req.params.l_name], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * GET route to fetch CUSTOMER data based on first and last name.
 * @name GET /customers/name/:f_name/:l_name
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/customers/name/:f_name/:l_name', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Query the CUSTOMER table
        connection.query('SELECT * FROM CUSTOMER WHERE f_name = ? AND l_name = ?', [req.params.f_name, req.params.l_name], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error querying the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }

            res.json(results[0]);
        });
    });
});

/**
 * POST route for creating a new CUSTOMER.
 * @name POST /customers
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/customers', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Insert a new CUSTOMER into the CUSTOMER table
        connection.query('INSERT INTO CUSTOMER (f_name, l_name, email, phone) VALUES (?, ?, ?, ?)', [req.body.f_name, req.body.l_name, req.body.email, req.body.phone], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error inserting into the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(201).json({ message: 'Customer created successfully' });
        });
    });
});

// Define a PUT route for updating an existing CUSTOMER
app.put('/customers/:id', (req, res) => {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring database connection:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Update the CUSTOMER in the CUSTOMER table
        connection.query('UPDATE CUSTOMER SET f_name = ?, l_name = ?, email = ?, phone = ? WHERE id = ?', [req.body.f_name, req.body.l_name, req.body.email, req.body.phone, req.params.id], (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error updating the CUSTOMER table:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

