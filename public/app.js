$(window).ready(function () {
  $.getJSON('/api/todos')
    .then(addTodos)

  $('#todoInput').keypress(function (event) {
    if (event.which == 13) {
      createTodo()
    }
  })

  $('.list span').on('click', function () {
    removeTodo($(this).parent())
  })
})

function addTodos(todos) {
  // add todos to the page here
  todos.forEach((todo) => {
    addTodo(todo)
  })
}

function addTodo(todo) {
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
  newTodo.data('id', todo._id)
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
      $('#todoInput').val(' ')
      addTodo(newTodo)
    })
    .catch((err) => {
      console.log(err)
    })
}

function removeTodo(todo) {
  var clickedId = todo.data('id')
  var deleteUrl = '/api/todos/' + clickedId
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
    .then((data) => {
      todo.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}