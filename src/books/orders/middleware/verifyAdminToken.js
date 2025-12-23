const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token not Provided. Access Denied" })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        req.user = user;
        next()
    })
}
module.exports = { verifyAdminToken };