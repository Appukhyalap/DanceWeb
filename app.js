require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500;

// ✅ Enable CORS for frontend communication
app.use(cors({
    origin: '*', // Change '*' to your frontend URL in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// ✅ MongoDB Connection
const MONGO_URI ="mongodb+srv://Shantaveer:BNJVS8SfYcMVaKNJ@cluster0.tx6by.mongodb.net/Shantaveer?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});
const Contact = mongoose.model('Contact', contactSchema);

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/contact.html"));
});

// ✅ Handle Form Submission (POST Request)
app.post("/contact", async (req, res) => {
    console.log("📩 Received Data:", req.body);

    // Validate input
    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.address || !req.body.concern) {
        return res.status(400).json({ message: "❌ All fields are required!" });
    }

    try {
        const contactData = new Contact(req.body);
        const savedData = await contactData.save();
        console.log("✅ Data saved in MongoDB:", savedData);

        res.status(200).json({ message: "Form submitted successfully!", data: savedData });
    } catch (error) { 
        console.error("❌ Error Saving Data:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

// ✅ Start Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

