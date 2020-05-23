$(document).ready(function () {
 $.getJSON('/api/todos')
  .then(addTodos)

 $('#todoInput').keypress(function (event) {
  if (event.which === 13) {
   createTodo()
  }
 })
})

function addTodos(todos) {
 // add todos to the page here
 todos.forEach((todo) => {
  addTodo(todo)
 })
}

function addTodo(todo) {
 var newTodo = $('<li class="task">' + todo.name + '</li>')
 if (todo.completed) {
  newTodo.addClass('done')
 }
 $('.list').append(newTodo)
}

function createTodo() {
 // send a post request to create new todo
 var userInput = $('#todoInput').val()
 $.post('/api/todos', { name: userInput })
  .then((newTodo) => {
   $('#todoInput').val('')
   addTodo(newTodo)
  })
  .catch((err) => {
   console.log(err)
  })
}