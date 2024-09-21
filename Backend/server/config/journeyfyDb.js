const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)


    .then(() => {
        console.log("DB connection successful");
        // console.log(process.env.MONGO_URL)

    })
    .catch((err) => {
        console.log("Error in DB connection", err);
    })
    