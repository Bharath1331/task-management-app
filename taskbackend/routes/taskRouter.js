const express = require('express');
const router = express.Router();
const cors = require('cors');

const TaskModel = require('../src/task/taskModel')

//adding 
router.post('/task/create', async(req,res) => {
    try{
        const task = new TaskModel(req.body);
        await task.validate();
        await task.save();

        res.status(201).send({
            status : true,
            message : "Task created successfully",
        })
    }
    catch(error){
        res.send(400).send(error)
    }
    
})

//retrieving
router.get('/tasks', async(req,res) => {
    try{
        const tasks = await TaskModel.find({});
        res.send(tasks);
    }
    catch(error){
        res.send(error);
    }
})

//updating
router.patch('/task/:id', async(req,res) => {
    try{
        const _id = req.params.id;
        const _body = req.body;

        const updatetask = await TaskModel.findByIdAndUpdate(_id, _body, {new : true});

        if(!updatetask){
            res.status(404).send();
        }
        else{
            res.status(201).send({
                status : true,
                message : "Task updated successfully",
            })
        }
        
    }
    catch(error){
        res.send(error);
    }
})

//deleting
router.delete('/task/:id', async(req,res) => {
    try{
        const _id = req.params.id;
        const deleteTask = await TaskModel.findByIdAndDelete(_id);

        if(!deleteTask){
            res.status(400).send()
        }else{
            res.status(201).send({
                status : true,
                message : "Task deleted successfully",
            })
        }
    }
    catch(error){
        res.status(404).send(error)
    }
})

module.exports = router;