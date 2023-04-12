const express = require("express");
const {config} = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.js");
const taskRoutes = require("./routes/task.js");
const cors = require('cors');
const app = express();

config({path:"./database/config.env"});


// middlwares
app.use(cors({
    origin:["https://todoapp-8a4m.onrender.com/"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes);



module.exports = app;