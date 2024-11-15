const express=require('express')
const router=express.Router()
const todoData=require('../models/todoSchema')
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/todos', async (req, res) => {
    const todos = await todoData.find();
    res.json(todos);
  });
  
  router.post('/addtodos', async (req, res) => {
    const todo = new todoData({
      description: req.body.description,
      status: req.body.status,
    });
    await todo.save();
    res.json(todo);
  });
  
  router.put('/updatetodos/:id', async (req, res) => {
    const todo = await todoData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  });
  
  router.delete('/deletetodos/:id', async (req, res) => {
    await todoData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  });
  

module.exports=router
