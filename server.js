const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
// CORS Handling — START
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.options('/api/register', (req, res) => {
    res.sendStatus(200);
});
// CORS Handling — END

app.use(bodyParser.json());


// MongoDB Connection
const mongoURI = 'mongodb+srv://new_user_26:V5a_nKFkMKCFG9j@cluster0.svlil3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Define Schema & Model
const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    college: String,
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// API Endpoint to handle form submissions
app.post('/api/register', async (req, res) => {

    console.log('Received Data:', req.body);  // Add this line

    const { name, email, phone, college } = req.body;

    if (!name || !email || !phone || !college) {
        console.log('Validation Failed - Missing Fields');
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        const newReg = new Registration({name, email, phone, college });
        await newReg.save();
        console.log('Registration saved in DB');
        res.status(201).json({ msg: 'Registration successful' });
    } catch (error) {
        console.error('DB Save Error:',err);
        res.status(500).json({msg : 'Failed to register' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});