const express = require("express");
const { newTask , getMyTasks, updateTask, deleteTask} = require("../controllers/task");
const { isAuthenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/new",isAuthenticate,newTask);

router.get("/my",isAuthenticate,getMyTasks);

router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;