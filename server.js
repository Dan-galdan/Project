import express from "express";
import mongoose from "mongoose";
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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tellu";
// Alternative: Use MongoDB Atlas (cloud) - replace with your Atlas connection string
// const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/tellu";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

// 1️⃣ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// 2️⃣ Create User schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ['student', 'teacher', 'parent'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// 3️⃣ Create Post schema
const postSchema = new mongoose.Schema({
    schoolName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    authorName: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 },
    comments: [{ 
        text: String, 
        author: String, 
        createdAt: { type: Date, default: Date.now } 
    }]
});

const Post = mongoose.model("Post", postSchema);

// 3️⃣ Input validation middleware
const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 8;
};

// 4️⃣ Signup route
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role || 'student'
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            },
            token
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// 5️⃣ Login route
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
        const user = await User.findOne({ email: email.toLowerCase().trim() });
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
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// 6️⃣ Posts routes
// Get all posts
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            posts: posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Create new post
app.post("/api/posts", async (req, res) => {
    try {
        const { schoolName, title, description, rating, authorName } = req.body;

        // Validation
        if (!schoolName || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "School name, title, and description are required"
            });
        }

        const newPost = new Post({
            schoolName: schoolName.trim(),
            title: title.trim(),
            description: description.trim(),
            rating: rating || 0,
            authorName: authorName.trim() || 'Anonymous'
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// 7️⃣ Health check route
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Server is running" });
});

// 7️⃣ Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
