
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const { ObjectId } = require('mongodb');
dotenv.config({ path: './config/config.env' });


const createUser = async (req, res) => {
    try {
        const { fullName, number, city, companyName, password, email } = req.body;

        // Define the required keys
        const requiredKeys = ["fullName", "number", "city", "companyName", "password", "email"];

        // Check for extra keys in the request body
        const extraKeys = Object.keys(req.body).filter(key => !requiredKeys.includes(key));
        if (extraKeys.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Unexpected fields in the request: ${extraKeys.join(", ")}`,
                data: {}
            });
        }

        // Validate that all required fields are present and have values
        if (!fullName || !number || !city || !companyName || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields (fullName, number, city, companyName, password, email) are required.",
                data: {}
            });
        }

        // Validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
                data: {}
            });
        }

        // Validate the password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
                data: {}
            });
        }

        // Validate the number format
        const numberRegex = /^\d{10}$/; // Example: Validate a 10-digit number
        if (!numberRegex.test(number)) {
            return res.status(400).json({
                success: false,
                message: "Invalid number format. It must be a 10-digit numeric value.",
                data: {}
            });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "A user with this email already exists.",
                data: {}
            });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user with the hashed password
        const newUser = await User.create({
            fullName,
            number,
            city,
            companyName,
            password: hashedPassword,
            email
        });

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: {}
        });
    }
};


const getAlluserList = async (req, res) => {
    try {
        // Destructure query parameters
        const { page , limit, email , sortBy , sortOrder } = req.query;

        // Convert sortOrder to number (-1 for descending, 1 for ascending)
        const sortDirection = sortOrder === "asc" ? 1 : -1;

        // Build the query object for filtering by email (if provided)
        const query = email ? { email: { $regex: email, $options: "i" } } : {};

        // Calculate pagination values
        const skip = (page - 1) * limit;
        const users = await User.find(query)
            .select("-password -type") // Exclude password and type fields
            .sort({ [sortBy]: sortDirection }) // Sort by the given field and order
            .skip(skip) // Pagination: Skip previous pages
            .limit(Number(limit)); // Limit the number of results per page

        // Get the total count of users for pagination
        const totalUsers = await User.countDocuments(query);

        // Prepare pagination data
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            success: true,
            message: "User list retrieved successfully.",
            data: {
                users,
                pagination: {
                    totalUsers,
                    totalPages,
                    currentPage: page,
                    pageSize: limit,
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
};


const deleteById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete({ _id: new ObjectId(userId) });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const editById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        const { number } = req.body;
        const { city } = req.body;
        const { companyName } = req.body;
        const { completed } = req.body;
        const { passowrd } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const editUser = await User.findByIdAndUpdate(userId, { name, number, city, companyName, completed, passowrd }, { new: true });
        if (!editUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User edited successfully', editUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const login = async (req, res) => {
    // console.log(req.body,"  ")
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log(user,"amrendra  ")

        // Check if the user exists
        // console.log(user," email");
        if (!user) {
            console.log("true");
            return res.status(400).json({
                success: false,
                message: "Invalid email or password.",
                data: {}
            });
        }

        // Check if the password is correct
        // console.log(password,"  ",user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch,"rahul");
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password.",
                data: null
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, password: user.password },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        const expiresIn = Math.floor(Date.now() / 1000) + 43200;
        // Respond with token and user details
        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    city: user.city,
                    companyName: user.companyName,
                },
                token: token,
                exp: expiresIn
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: {}
        });
    }
};

module.exports = {
    createUser,
    getAlluserList,
    deleteById,
    editById,
    login
};
