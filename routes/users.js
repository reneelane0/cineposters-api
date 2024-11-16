const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// signup route
router.post('/signup', async (req, res) => {

    // signup functionality
    const { email, password, first_name, last_name } = req.body;
    
    // input validation
    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({error: "Please fill out all fields." });
    }

    try {
        // check if email is already in db
        const existingEmail = await prisma.customer.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return res.status(404).json({ error: "This email already exists." });
        }

        // bcrypt
        const encryptedPass = await bcrypt.hash(password, 10); 

        // create user
        const newUser = await prisma.customer.create({
            data : {
                email,
                password: encryptedPass,
                first_name,
                last_name,
            },
        });

        res.status(201).json({ message: "Signup successful!" , user: newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing signup request." });
    }
});

// login route
router.post('/login', async (req, res) => {

    // login functionality
    const { email, password } = req.body;

    // input validation
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter both email and password." });
    }

    try {
        // check if user exists
        const user = await prisma.customer.findUnique({
            where: { email }
        });

        // if user isn't in db then error
        if (!user) {
            return res.status(404).json({ error: "User not in database." });
        }

        // validate password
        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            // if invalid pass, send unauthorized error
            return res.status(401).json({ error: "Incorrect password. "});
        }

        // return email if login is successful
        res.status(200).json({ message: "Login successful!", email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing login request." });
    }
});

// logout route
router.post('/logout', (req, res) => {
    // logout functionality
});

// get session route
router.get('/getSession', (req, res) => {
    // getting user session functionality
});

module.exports = router;

