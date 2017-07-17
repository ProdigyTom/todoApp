var AppView = Backbone.View.extend({
    el: $("#todoApp"),
    events: {
        'submit': 'createNew',
        'click .all': 'showAll',
        'click .remaining': 'showRemaining',
        'click .completed': 'showCompleted'
    },
    template: _.template(
        '<h1>TODO:</h1>' +
        '<div id="newTodo"></div>' +
        '<input type="button" value="All" class="all">' +
        '<input type="button" value="Remaining" class="remaining">' +
        '<input type="button" value="Completed" class="completed">' +
        '<ul id="todo-list"></ul>'
    ),
    initialize: function(){
        this.render()

        this.todoList = new TodoList();
        this.todoList.fetch();
        this.listView = new TodoListView({ el: '#todo-list', collection: this.todoList})

        new NewTodoView({ el: '#newTodo' })
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    createNew: function(e) {
        e.preventDefault()
        var todo = {
            name: this.$('input[name=newName]').val(),
            desc: this.$('input[name=newDesc]').val()
        }
        this.todoList.create(todo, {
            error:function(model,response){console.log(response);}
        });
    },
    showAll: function() {
        this.todoList.showAll()
    },
    showRemaining: function() {
        this.todoList.showRemaining()
    },
    showCompleted: function() {
        this.todoList.showCompleted()
    }
})
