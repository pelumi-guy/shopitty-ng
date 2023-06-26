const https = require('https')
const app = require('./app');
const { connectDatabase } = require('./config/database');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const os = require('os');
const fs = require('fs');

//Handling uncaught exceptions
process.on('uncaughtException', async err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled exception");
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: "backend/config/config.env" })

// HTTPS configurations
const _homedir = os.homedir();
const key = fs.readFileSync(_homedir+'/ssl-cert/localhost-key.pem','utf-8')
const cert = fs.readFileSync(_homedir+'/ssl-cert/localhost.pem','utf-8')

const parameters = {
    key,
    cert
  }

// Connect to Database
connectDatabase();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const server = app.listen(process.env.PORT,  () => {
//     console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
// })

const server = https.createServer(parameters, app)

server.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handling unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(() => {
        process.exit(1)
    });
})