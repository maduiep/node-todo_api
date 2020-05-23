$(document).ready(function () {
 $.getJSON('/api/todos')
  .then(addTodos)
})

function addTodos(todos) {
 // add todos to the page here
 todos.forEach((todo) => {
  var newTodo = $('<li class="task">' + todo.name +'</li>')
  $('.list').append(newTodo)
 })
}