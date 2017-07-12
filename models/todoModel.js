exports.ToDoItem = Backbone.Model.extend({
    defaults: {
        name: "Empty Todo",
        desc: "Empty Description"
    }

})

exports.TodoList = Backbone.Collection.extend({
    model: ToDoItem
})
