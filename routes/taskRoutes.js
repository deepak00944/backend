const express = require('express');
const{createTask, getAllTasks,getTask,updateTask,deleteTask} = require('../controllers/taskControllers')

const router = express.Router();

router.post("/create-task", createTask)
router.get("/getAll-task", getAllTasks)
router.get("/get-tasks/:id", getTask)
router.put("/update-tasks/:id", updateTask)
router.delete("/delete-tasks/:id", deleteTask)

module.exports = router;