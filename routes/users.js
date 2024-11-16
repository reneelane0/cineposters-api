const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// signup route
router.post('/signup', (req, res) => {
    // signup functionality
});

// login route
router.post('/login', (req, res) => {
    // login functionality
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

