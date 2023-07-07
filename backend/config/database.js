const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');


// const uri = process.env.DB_URI;
if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("DEVELOPMENT")) {
    uri = process.env.DB_LOCAL_URI;
} else if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("PRODUCTION") ||
           process.env.NODE_ENV === "production") {
    uri = process.env.DB_URI;
}

exports.connectDatabase = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        },
    ).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch((err) => console.log(`Unable to connect to database... Due to ${err}`));
};


// const client = new MongoClient(process.env.DB_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });


exports.connectAtlas = async () => {
    client.connect()
    .then(() => console.log("Server connected with remote database"))
    .catch(() => console.log("Unable to connect to database..."));
}