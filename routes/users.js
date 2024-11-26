const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// user schema definition
const userSchema = new mongoose.Schema({
    customer_id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true} ,
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
});

// create user model
const User = mongoose.model('User', userSchema);

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
        const existingEmail = await User.findOneAndDelete({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "This email already exists." });
        }

        // bcrypt
        const encryptedPass = await bcrypt.hash(password, 10); 

        // create user
        const newUser = new User({
            email,
            password: encryptedPass,
            first_name,
            last_name,
           
        });

        await newUser.save();
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
        const user = await User.findOne({ email });

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

        // add now authenticated user's data to session ****
        req.session.user = {
            customer_id: user.customer_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        };

        res.status(200).json({
            message: "Login successful!",  
        });
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

