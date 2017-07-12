var todoList = new TodoList();
var todos = [
    {name: 'Shopping', desc: 'Get eggs, milk, butter'},
    {name: 'work', desc: 'do work', complete: true},
    {name: 'clean', desc: 'kitchen, bedroom, bathroom'}
]
todoList.reset(todos);
new TodoListView({ el: '#todo-list', collection: todoList})
