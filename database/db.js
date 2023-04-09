const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"todoapp"
    })
    .then(()=>{console.log(`Connected!`)})
    .catch((e)=>{console.log(`error ${e}`)})
}

module.exports = connectDb;