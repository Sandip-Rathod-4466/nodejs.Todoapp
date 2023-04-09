const express = require("express");
const router = express.Router();
const {getAllUser,createNewUser,getSingleUser, deleteUser, updateUser, loginUser, getUserProfile, logoutUser} = require("../controllers/user");
const { isAuthenticate } = require("../middlewares/auth");

router.get("/all",getAllUser);

router.post("/register",createNewUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/me",isAuthenticate,getUserProfile);

router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);


module.exports = router;