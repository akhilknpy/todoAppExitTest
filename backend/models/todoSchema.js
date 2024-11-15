const mongoose=require('mongoose')
const TodoSchema = new mongoose.Schema({
    description: String,
    status: String,
  });
const todoData=mongoose.model('todo',TodoSchema)
module.exports=todoData