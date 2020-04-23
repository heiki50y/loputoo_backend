const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const xss = require('xss-clean');
const path = require('path')
const helmet = require('helmet');

const app = express();

connectDB();


// Init Middleware
app.use(express.json());
app.use(cookieParser());

// xss
app.use(xss());

// Set security headers
app.use(helmet());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/taotlus', require('./routes/taotlus'));
app.use('/api/company', require('./routes/company'));
app.use('/api/pdf', require('./routes/pdf'))

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view engine', 'pug')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
