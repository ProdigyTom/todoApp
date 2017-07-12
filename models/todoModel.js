var TodoItem = Backbone.Model.extend({
    defaults: {
        name: "Empty Todo",
        desc: "Empty Description",
        complete: false
    },
    toggle: function() {
        this.set({complete: !this.get("complete")});
    },
})

var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    done: function() {
      return this.where({complete: true});
    },
    remaining: function() {
      return this.where({complete: false});
    },
})
