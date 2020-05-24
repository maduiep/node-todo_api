$(document).ready(function () {
  $.getJSON('/api/todos')
    .then(addTodos)

  $('#todoInput').keypress(function (event) {
    if (event.which == 13) {
      createTodo()
    }
  })

  $('.list').on('click', 'li', function () {
    updateTodo($(this))
  })

  $('.list').on('click', 'span', function (e) {
    e.stopPropagation()
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
  newTodo.data('completed', todo.completed)
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

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id')
  var isDone = !todo.data('completed')
  var updateData = { completed: isDone }
  // console.log(updateData)
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
    .then((updatedTodo) => {
      todo.toggleClass('done')
      todo.data('completed', isDone)
      // console.log(updatedTodo)
    })
  //console.log(todo.data('completed'))
}