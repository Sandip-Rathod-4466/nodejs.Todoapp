const app = require("./app.js");



const connectDb = require('./database/db.js');
connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`server listen at ${process.env.PORT} in ${process.env.NODE_ENV} Mode` );
});
