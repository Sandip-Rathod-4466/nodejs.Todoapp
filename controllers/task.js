const Task = require("../models/task.js");

const newTask = async (req,res)=>{

  try {
    const {title , description} = req.body;
   
    await Task.create({
     title,
     description,
     user:req.user,
    });
 
    res.json({
     status:true,
     message:"Task added successfully"
    });

  } catch (error) {
    res.json({
        status:false,
        message:"invalid title or description"
       });
  }

};

const getMyTasks = async (req,res)=>{
    try {
    const userId = req.user._id;
    const tasks = await Task.find({user:userId});
    res.json({
        status:true,
        tasks
    });
    } catch (error) {
        res.json({
            status:false,
            message:error
        });
    }
    
};

const updateTask = async (req,res)=>{
    try {
        const id = req.params.id;

        const task = await Task.findById(id);
        task.isCompleted = !task.isCompleted;
        await task.save();
    
        res.json({
            status:true,
            message:"task updated!"
        });

    } catch (error) {
        res.json({
            status:false,
            message:"user id not found"
        });
    }
   
};

const deleteTask = async (req,res)=>{
    const {id} = req.params;

    const task = await Task.findByIdAndDelete(id);
if (task) {
    res.json({
        status:true,
        message:"task completed!"
    });
}else{
    res.json({
        status:false,
        message:"task not found!"
    });
}
    
    
};

module.exports = {newTask,getMyTasks,updateTask,deleteTask};