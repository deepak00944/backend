const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(console.log("db connected"))
    .catch((err)=>{
        console.log("Db connection not successful");
        console.error(err);
        process.exit(1);
    })
}