const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        },
    ).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch(() => console.log("Unable to connect to database..."))
}

module.exports = connectDatabase