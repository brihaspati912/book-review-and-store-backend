const express = require('express');
const router = express.Router();
const User = require('./users.model');
const jwt = require('jsonwebtoken');

router.post('/admin', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const admin = await User.findOne({ userName: 'admin' });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: "Unauthorized: Incorrect password" });
        }
        //if everything is okay then create admin user

        const token = jwt.sign({ id: admin._id, role: admin.role, userName: admin.userName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: "Admin user created through token successfully", token: token,
            user: {
                userName: admin.userName,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Error creating admin user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

})
module.exports = router;