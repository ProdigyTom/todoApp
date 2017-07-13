var TodoItem = Backbone.Model.extend({
    idAttribute: 'id',
    defaults: {
        name: "Empty Todo",
        desc: "Empty Description",
        complete: false
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
    toggle: function() {
        this.set({complete: !this.get("complete")});
        this.save();
    },
})

var TodoList = Backbone.Collection.extend({
    model: TodoItem,
    url: '/items',
    comparator: 'id',
    getCompleted: function() {
        return this.where({complete: true});
    },
    getRemaining: function() {
        return this.where({complete: false});
    },
})
