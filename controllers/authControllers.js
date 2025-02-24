import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Base authentication middleware
async function authenticate(req, res) {
    console.log("checking user authentication")
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Please log in' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    return user;
}

// Role-based middleware
function restrictTo(role) {
    return async (req, res, next) => {
        console.log("checking user restriction type", role);
        try {
            const user = await authenticate(req, res);
            if (!res.headersSent && user.role !== role) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            req.user = user;
            console.log("restrict to function");
            next();
        } catch (err) {
            res.status(500).json({ error: 'Server error', message: err.message });
        }
    };
}

async function login(req, res) {
    console.log("Logging in");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        const user = await userModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie('jwt', token);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

async function signup(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const createdUser = await userModel.create({ name, email, password, confirmPassword });
        res.status(201).json({ message: 'User created. Please log in.', user: createdUser });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
}

export const isAdmin = restrictTo('admin');
export const isOrganisor = restrictTo('organisor');
export const isLoggedIn = function (req, res, next) {
    console.log("checking if user is logged in");
    return restrictTo('user')(req, res, next);
};
export { login, signup };