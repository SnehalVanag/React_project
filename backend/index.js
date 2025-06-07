import express from 'express';
import mongoose from 'mongoose'; // Still needed for mongoose.Types.ObjectId.isValid
import cors from 'cors';
import { connectDB } from './config/db.js'; // Assuming this connects to MongoDB
import { Usermodel } from './models/User.js'; // This imports your Mongoose model
import dotenv from 'dotenv';

dotenv.config();

// Define PORT, providing a fallback if not set in .env
const PORT = process.env.PORT || 3001; // Changed to 3001 to avoid potential conflicts, you can use 3000

const app = express();

// Middleware setup
app.use(cors({
    origin: "http://localhost:5173" // Ensure this matches your React app's URL
}));
app.use(express.json()); // To parse JSON request bodies

// --- IMPORTANT FIX: Connect to DB *before* starting the server ---
// This ensures that the database connection is established and ready
// before your application starts listening for requests that depend on the DB.
connectDB(); // Assuming connectDB handles its own promises/async internally

// --- Routes ---

// GET all users
app.get('/', (req, res) => {
    Usermodel.find({})
        .then(users => res.status(200).json(users)) // Added status 200 for success
        .catch(err => {
            console.error("Error fetching all users:", err);
            res.status(500).json({ message: "Error fetching users", error: err.message });
        });
});

// GET a single user by ID
app.get('/getuser/:id', (req, res) => {
    const id = req.params.id;
    // FIX: findById takes the ID string directly, not an object {_id: id}
    Usermodel.findById(id)
        .then(user => { // Renamed 'users' to 'user' as it's a single document
            if (!user) {
                console.warn(`[SERVER] User with ID ${id} not found.`);
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(`Error fetching user with ID ${id}:`, err);
            // Check for invalid ID format specifically for 400 Bad Request
            if (err.name === 'CastError' && err.path === '_id') {
                return res.status(400).json({ message: "Invalid user ID format" });
            }
            res.status(500).json({ message: "Error fetching user", error: err.message });
        });
});

// CREATE a new user
app.post('/creatUser', (req, res) => { // Frontend might be calling 'createUser' - check casing
    console.log("Request body for creating user:", req.body);
    Usermodel.create(req.body)
        .then(user => res.status(201).json(user)) // Use 201 for successful resource creation
        .catch(err => {
            console.error("Error creating user:", err);
            // More specific error for duplicate key (e.g., email)
            if (err.code === 11000) {
                return res.status(409).json({ message: "User with this email already exists." });
            }
            res.status(500).json({ message: "Error creating user", error: err.message });
        });
});

// UPDATE an existing user by ID
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    // FIX: findByIdAndUpdate takes the ID string directly
    Usermodel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, { new: true }) // { new: true } returns the updated document
        .then(user => { // Renamed 'users' to 'user'
            if (!user) {
                console.warn(`[SERVER] User with ID ${id} not found for update.`);
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(`Error updating user with ID ${id}:`, err);
            if (err.name === 'CastError' && err.path === '_id') {
                return res.status(400).json({ message: "Invalid user ID format" });
            }
            res.status(500).json({ message: "Error updating user", error: err.message });
        });
});

// DELETE a user by ID
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    console.log(`[SERVER] Received DELETE request for ID: ${id}`);

    // Validate ID format early to return 400 Bad Request instead of 500 Internal Server Error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`[SERVER] Invalid ID format: ${id}`);
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    Usermodel.findByIdAndDelete(id) // Correct Mongoose call
        .then(result => {
            if (!result) {
                // If result is null, no document with that ID was found
                console.warn(`[SERVER] User with ID ${id} not found in database.`);
                return res.status(404).json({ message: "User not found" });
            }
            console.log(`[SERVER] User with ID ${id} successfully deleted from database.`);
            res.status(200).json({ message: "User deleted successfully", deletedUser: result });
        })
        .catch(err => {
            // Catch any errors from Mongoose (e.g., network issues, database down)
            console.error(`[SERVER] ERROR deleting user with ID ${id}:`, err);
            res.status(500).json({ message: "Internal server error during deletion", error: err.message, stack: err.stack });
        });
});

// Start the server
connectDB(); // Moved here
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});