var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<li><%= name %></li>'),
    initialize: function() {
        //this.render()
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})

var TodoListView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        this.collection.forEach(this.addOne, this)
    },
    addOne: function(todoItem){
        var todoView = new TodoView({model: todoItem})
        this.$el.append(todoView.render().el);
    }
});
