var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<li>' +
        '<input type="checkbox" class="complete" <% if(this.model.get("complete")) print("checked") %> />' +
        '<% if(this.model.get("complete")) print("<strike>") %>' +
        ' <span class="name"><%= name %></span>' +
        '<% if(this.model.get("complete")) print("</strike>") %>' +
        ' <input type="button" value="Delete" class="delete" />' +
        '<% if(this.open) print("<ul><li>" + desc + "</li></ul>") %>' +
        '</li>'),
    events: {
        'change .complete': 'toggleComplete',
        'click .name': 'toggleOpen',
        'click .delete': 'delete',
    },
    open: false,
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
        this.remove()
        this.model.destroy()
    }
})

var TodoListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.render();
    },
    render: function() {
        this.$el.html('');
        this.collection.forEach(this.addOne, this);
    },
    addOne: function(todoItem){
        var todoView = new TodoView({model: todoItem})
        this.$el.append(todoView.render().el);
    },
    addAll: function(){
        this.collection.forEach(this.addOne, this)
    }
});
