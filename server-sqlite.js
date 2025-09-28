import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Environment variables with fallbacks
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

// Create SQLite database
const db = new sqlite3.Database('./users.db');

// Create users table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'student',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Input validation functions
const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 8;
};

// Signup route
app.post("/api/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // Check if user already exists
        db.get("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()], async (err, existingUser) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user
            db.run(
                "INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)",
                [firstName.trim(), lastName.trim(), email.toLowerCase().trim(), hashedPassword, role || 'student'],
                function (err) {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({
                            success: false,
                            message: "Internal server error"
                        });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { id: this.lastID, email: email.toLowerCase().trim(), role: role || 'student' },
                        JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: {
                            id: this.lastID,
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            email: email.toLowerCase().trim(),
                            role: role || 'student'
                        },
                        token
                    });
                }
            );
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Login route
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        // Find user
        db.get("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()], async (err, user) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.json({
                success: true,
                message: "Login successful",
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                },
                token
            });
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Server is running with SQLite" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} with SQLite database`);
});
