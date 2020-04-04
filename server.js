const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');

const app = express();

connectDB();


// Init Middleware
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/taotlus', require('./routes/taotlus'));
app.use('/api/company', require('./routes/company'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
