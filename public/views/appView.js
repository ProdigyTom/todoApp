var AppView = Backbone.View.extend({
    el: $("#todoApp"),
    events: {
        'submit': 'createNew'
    },
    template: _.template(
        '<h1>TODO:</h1>' +
        '<div id="newTodo"></div>' +
        '<ul id="todo-list"></ul>'
    ),
    initialize: function(){
        this.render()

        this.todoList = new TodoList();
        this.todoList.fetch();
        new TodoListView({ el: '#todo-list', collection: this.todoList})

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
            success:function(model,response){
                model.set('id', response[0])
            },
            error:function(model,response){console.log(response);}
        });
    }
})
