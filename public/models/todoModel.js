var TodoItem = Backbone.Model.extend({
    idAttribute: 'id',
    defaults: {
        name: "Empty Todo",
        desc: "Empty Description",
        complete: false,
        open: false,
        hidden: false
    },
    toJSON: function() {
        //The way I wrote the backend listId is a foreign key to the list table and cannot be null,
        //so anything that doesn't hjave one already will be set to 1
        var attributes = _.clone(this.attributes);
        if(!attributes.listId){
            attributes.listId = 1;
        }
        return attributes
    },
    toggleComplete: function() {
        this.set({complete: !this.get("complete")});
        this.save();
    },
    toggleOpen: function() {
        this.set({open: !this.get("open")});
    },
    hide: function() {
        this.set({hidden: true});
    },
    show: function() {
        this.set({hidden: false});
    },
})

var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    url: '/items',
    comparator: 'id',
    showAll: function() {
        this.forEach(function(todo){
            todo.show()
        })
    },
    showCompleted: function() {
        this.forEach(function(todo){
            if(todo.get("complete")){
                todo.show()
            } else {
                todo.hide()
            }
        })
    },
    showRemaining: function() {
        this.forEach(function(todo){
            if(todo.get("complete")){
                todo.hide()
            } else {
                todo.show()
            }
        })
    },
})
