const User = require("../models/user.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//! Get all user 
const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);

    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }
};


// ! Create new user
const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ? check if user alredy exist or not
        const user = await User.findOne({ email });

        if (user) {
            res.json({
                status: false,
                message: "User already exist"
            });
        }

        // ? if user not exist  
        // ! creating new user
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashPassword,
            });

            // creatin a token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: (15 * 60 * 1000),
                sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,

            }).json({
                status: true,
                message: "Register successfully"
            });
        }

    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }

};

// ? login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        // ? check if user  exist or not

        if (!user) {
            return res.json({
                status: false,
                message: "invalid user or password!"
            });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.json({
                    status: false,
                    message: "invalid user or password!"
                });
            } else {
                // creatin a token

                const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: (15 * 60 * 1000),
                }).json({
                    status: true,
                    message: `welcome back, ${user.name}`
                });
            }
        }







    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }
};

// ! get user profile
const getUserProfile =  (req, res) => {
    
   res.json({
    status:true,
    user:req.user,
   });
};


// logout user
const logoutUser = (req,res)=>{
    res.cookie("token","",{expires: new Date(Date.now())}).json({
        status:true,
        message:"user logout",
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    });
};

// ! Get single user
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }

};

// ! Delete a user 
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }
};

// ! Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.json({
            status: false,
            message: error
        });
    }
};




module.exports = { getAllUser, createNewUser, getSingleUser, deleteUser, updateUser, loginUser, getUserProfile,logoutUser }