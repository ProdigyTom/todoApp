var TodoItem = Backbone.Model.extend({
    defaults: {
        name: "Empty Todo",
        desc: "Empty Description"
    }
})

var TodoList = Backbone.Collection.extend({
    model: TodoItem
})
