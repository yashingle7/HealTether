require('dotenv').config({path: "./config.env"});
const connectDB = require('./config/db');
const express = require('express');
connectDB();
const app = express();
app.use(express.json());                         // middleware to get data from the body
app.use('/api/auth', require('./routes/auth')); // whenever a request to this api/auth then gets routed to /routes/auth
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => 
    console.log('listening on port ' +PORT)
);
process.on('unhandledRejection', (err, promise) => {
    console.log('Logged Error: ' + err);
    server.close(() => process.exit(1));
});