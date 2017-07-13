var TodoItem = Backbone.Model.extend({
    idAttribute: 'id',
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
    url: '/items',
    parse: function(response) {
        return response.map(function(item){
            item.id = item.itemid;
            delete item.itemid;
            item.desc = item.itemdescription;
            delete item.itemdescription;
            item.name = item.itemname;
            delete item.itemname;
            return item;
        })
    },
    initialize: function() {
        //this.fetch();
    },
    getCompleted: function() {
        return this.where({complete: true});
    },
    getRemaining: function() {
        return this.where({complete: false});
    },
})
