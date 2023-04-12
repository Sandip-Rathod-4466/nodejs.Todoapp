const User = require("../models/user.js")
const jwt = require("jsonwebtoken");

const isAuthenticate = async (req,res,next)=>{
    const { token } = await req.cookies;

    if (!token) {
      res.json({
        status: false,
        token,
        message: "Login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const { _id } = decoded;
    const user = await User.findById(_id);
    req.user = user;
    next();
}



module.exports = {isAuthenticate}