const { Todo } = require('../database');

async function addTodo(req, res) {
  console.log('--- IN ---');

  try {
    const { username, title, author, completed, category, user } = req.body;
    const todo = await Todo.create({
      username,
      title,
      author,
      completed,
      category,
      user
    });
    console.log(todo);
    res.status(301).json({ message: 'created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function getAll(req, res) {
  try {
    const todos = await Todo.find();
    res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id });
    res.status(201).json({ message: 'deleted', id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function update(req, res) {

}

// 3
async function changeCompletion(req, res) {

  const { id } = req.params;
  const { completed } = req.body;

  const todo = await Todo.findByIdAndUpdate(id, { completed });

  return {
    message: 'Updated Successfully',
    todo
  };

}

// 1
async function findFiltered(req, res) {
  const { title, category } = req.query;

  let todos = [];

  if (title) todos = await Todo.find({ title });
  else if (category) todos = await Todo.find({ category });

  if (todos.length) {
    return res.json({ todos });
  }

}

module.exports = { addTodo, getAll, getOne, deleteTodo, changeCompletion, findFiltered };