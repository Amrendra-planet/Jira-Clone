const jwt = require('jsonwebtoken');
 
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' });
const JWT_SECRET= process.env.JWT_SECRET ;


function verifyToken(req, res, next) {
    console.log('Headers:', req.headers);
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        console.error('Authorization header not provided');
        return res.status(403).json({ error: 'Token not provided' });
    }
    
    const token = authHeader.split(' ')[1]; // Assuming the format is 'Bearer <token>'
    
    if (!token) {
        console.error('Token not provided in authorization header');
        return res.status(403).json({ error: 'Token not provided' });
    } 

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ error: 'Unauthorized' }); 
        }
        
        console.log('Token verified successfully:', decoded);
        req.user = decoded; // Attach decoded user information to the request object
        next();
    });
}

module.exports = verifyToken;
