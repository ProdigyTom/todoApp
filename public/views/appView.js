var AppView = Backbone.View.extend({
    el: $("#todoApp"),
    events: {
        'submit': 'createNew'
    },
    template: _.template(
        '<h1>TODO:</h1>' +
        '<form class="newItem">Name:<input type="text" name="newName" /> Description:<input type="text" name="newDesc" /> <input type="submit" class="submit" value="Create New Todo" /></form>' +
        '<ul id="todo-list"></ul>'
    ),
    initialize: function(){
        this.render()
        this.todoList = new TodoList();

        this.todoList.fetch();
        new TodoListView({ el: '#todo-list', collection: this.todoList})
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
        this.todoList.create(todo);
    }
})
