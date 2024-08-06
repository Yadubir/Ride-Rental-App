const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());

// paste your mongoDB connection string here
const mongoUrl = ''

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err)
});

require('./UserDetails');

const User = mongoose.model('UserInfo');

// Define Reservation schema and model
const Reservation = mongoose.model('Reservation', {
    duration: Number,
    from: String,
    parkingStand: String,
    name: String,
    totalAmount: Number,
    userId: String // Add userId field
});
// const Profile = mongoose.model('Reservation', {
//     name: String,
//     registrationNumber: String,
//     mobileNumber: String,
//     duration: String,
//     name: String,
//     userId: String // Add userId field
// });

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// get user data
app.get('/user', async (req, res) => {
    const { email } = req.query;

    try {
        // Fetch user data from the database (You need to pass the user ID in the request query or params)
        const user = await User.findOne({ email: email});

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Add reservation route
app.post('/reservation', async (req, res) => {
    const { duration, from, parkingStand, name, totalAmount, userId } = req.body;

    try {
        // Create reservation in the database
        const reservation = await Reservation.create({
            duration: duration,
            from: from,
            parkingStand: parkingStand,
            name: name,
            totalAmount: totalAmount,
            userId: userId // Save user ID with reservation
        });
        res.send({ status: 'ok', data: 'Reservation created successfully', reservation });
    } catch (error) {
        return res.status(422).send(error.message);
    }
});

// Add endpoint to end ride
app.delete('/reservation/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Reservation.findByIdAndDelete(id);
        res.send({ status: 'ok', data: 'Reservation ended successfully' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Fetch active reservations
app.get('/activeReservations', async (req, res) => {
    try {
        const activeReservations = await Reservation.find();
        res.send(activeReservations);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.status(422).send('User already exists');
    }

    try {
        await User.create({
            name: name,
            email: email,
            password: password
        });
        res.send({ status: 'ok', data: 'User registered successfully' });
    } catch (error) {
        return res.status(422).send(error.message);
    }
});

// Add login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }

        // You might want to implement JWT or session-based authentication here

        res.send({ status: 'ok', data: 'Login successful' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get('/', (req, res) => {
    res.send({ status: 'Server is running' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});