// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const app = express();
// const mangoose = require('mongoose');
// mangoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
// const port = 3003;

// // EXPRESS SPECIFIC STUFF
// app.use(express.static('.')); // Serve files from root directory
// app.use('/static', express.static('static')); // For static directory
// app.use(express.urlencoded());

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug'); // Set the template engine as pug
// app.set('views', 'views'); // Set the views directory

// // Test the views directory path
// console.log("Views directory:", path.join(__dirname, 'views'));

// // ENDPOINTS
// app.get('/', (req, res) => {
//   const con = "This is the best content on the internet so far, so use it wisely!";
//   const params = { title: 'Harry Dance Academy', content: con };
//   res.status(200).render('index.pug', params);
// });

// app.post('/', (req, res) => {
//   let Myname = req.body.name;
//   let age = req.body.age;
//   let gender = req.body.gender;
//   let address = req.body.address;
//   let more = req.body.more;

//   let outputToWrite = `The name of the client is ${Myname}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`;
//   fs.writeFileSync('output.txt', outputToWrite);

//   const params = { message: 'Your form has been submitted successfully!' };
//   res.status(200).render('index.pug', params);
// });

// // START THE SERVER
// app.listen(port, () => {
//   console.log(`The application started successfully on port ${port}`);
// });

// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');


// const PORT = 5500;


// mongoose.connect('mongodb://localhost:27017/contactDance', { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     }).then(() => console.log("✅ MongoDB Connected"))
//       .catch(err => console.log("MongoDB Connection Error:", err));

// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');

// const PORT = 5500;

// // ✅ Middleware for parsing form data & JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ✅ Serve static files from 'public'
// app.use(express.static(path.join(__dirname, "public")));

// // ✅ MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/contactDance', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// }).then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// // Define Schema
// const contactSchema = new mongoose.Schema({
//     name: String,
//     phone: String,
//     email: String,
//     address: String,
//     concern: String
// });
// const Contact = mongoose.model('Contact', contactSchema);

// // Serve Contact Page
// app.get("/contact", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/views/contact.html"));
// });

// // Handle Form Submission (POST Request)
// app.post("/contact", async (req, res) => {
//     console.log("Received Form Data:", req.body);

//     if (!req.body.name || !req.body.phone || !req.body.email || !req.body.address || !req.body.concern) {
//         return res.status(400).json({ message: "❌ All fields are required!" });
//     }

//     try {
//         const myData = new Contact(req.body);
//         await myData.save();
//         res.status(200).json({ message: "Form submitted successfully!" });
//     } catch (error) {
//         console.error("Error saving dat", error);
//         res.status(500).json({ message: " Internal Server Error." });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(` Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 5500

// Use CORS to allow requests from different origins
app.use(cors({
    origin: '*', // Allows all origins (Change it to specific domain in production)
    methods: ['GET', 'POST'], // Allow only GET and POST
    allowedHeaders: ['Content-Type']
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/contactDance', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => console.log("✅ MongoDB Connected"))
      .catch(err => console.log(" MongoDB Connection Error:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});
const Contact = mongoose.model('Contact', contactSchema);
module.export = Contact;
 
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/contact.html"));
});

app.post("/contact", async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        const contactData = new Contact(req.body);
        const savedData = await contactData.save();
        console.log("✅ Data saved in MongoDB:", savedData);

        res.status(200).json({ message: "Form submitted successfully!", data: savedData });
    } catch (error) { 
        console.error("Error Saving Data:", error);
        res.status(500).json({ message: "Error saving data" });
    }
});



// ✅ Start Server
app.listen(PORT, () => {
    console.log (`Server running at http://localhost:${PORT}`);
});
