var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<li>' +
        '<% if(this.model.get("complete")) print("<strike>") %>' +
        '<span class="name"><%= name %></span>' +
        '<% if(this.model.get("complete")) print("</strike>") %>' +
        ' <input type="checkbox" class="complete" <% if(this.model.get("complete")) print("checked") %> />' +
        ' <input type="button" value="Delete" class="delete" />' +
        '<% if(this.open) print("<ul><li>" + desc + "</li></ul>") %>' +
        '</li>'),
    events: {
        'change .complete': 'toggleComplete',
        'click .name': 'toggleOpen',
        'click .delete': 'delete',
    },
    open: false,
    initialize: function() {
        //this.render()
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleComplete: function(e) {
        this.model.toggle();
        this.render()
    },
    toggleOpen: function(e) {
        this.open = !this.open
        this.render()
    },
    delete: function() {
        this.$el.remove();
    }
})

var TodoListView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        this.$el.html('');
        this.collection.forEach(this.addOne, this)
    },
    addOne: function(todoItem){
        var todoView = new TodoView({model: todoItem})
        this.$el.append(todoView.render().el);
    }
});
