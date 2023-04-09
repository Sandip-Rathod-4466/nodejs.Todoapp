const cors = require("cors");


const app = require("./app.js");
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

const connectDb = require('./database/db.js');
connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`server listen at ${process.env.PORT} in ${process.env.NODE_ENV} Mode` );
});
