const Task = require('../models/Task')

exports.getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find().sort({ createdAt: -1 })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.getTask = async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
          return res.status(404).json({ message: "Task not found" })
        }
        res.json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.createTask = async(req,res)=>{
    try {
        const { title, description, priority } = req.body
    
        if (!title) {
          return res.status(400).json({ message: "Title is required" })
        }
    
        const newTask = new Task({
          title,
          description,
          priority: priority || "medium",
        })
        // another way of creating - we can use Task.create({title,description, priority})  
        const savedTask = await newTask.save()
        res.status(201).json({
            success:true,
            message:"Task created",
            task:savedTask
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Failed to create task",
            error:error.message
        });
    }
}


exports.updateTask = async(req,res)=>{
    try {
        const { title, description, priority } = req.body
    
        if (!title) {
          return res.status(400).json({ message: "Title is required" })
        }
    
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          { title, description, priority },
          { new: true, runValidators: true },
        )
    
        if (!updatedTask) {
          return res.status(404).json({ 
            success:false,
            message: "Task not found" 
        })
        }
    
        return res.status(200).json({
            success:true,
            message:"Task updated",
            updatedTask
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
    
        if (!deletedTask) {
          return res.status(404).json({ message: "Task not found" })
        }
    
        res.json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message })
    }
}