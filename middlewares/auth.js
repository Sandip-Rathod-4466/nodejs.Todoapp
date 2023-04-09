const User = require("../models/user.js")
const jwt = require("jsonwebtoken");

const isAuthenticate = async (req,res,next)=>{
    const { token } = req.cookies;

    if (!token) {
        res.json({
            status: false,
            message: "Login first"
        });
    } 
    else {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const { _id } = decoded;
        const user = await User.findById(_id);
        if(user){
            req.user = user;
            next();
        }else{
            res.json({
                status: false,
                message: "invalid token"
            });
        }
    }
}



module.exports = {isAuthenticate}