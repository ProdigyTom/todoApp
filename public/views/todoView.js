var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<li>' +
        '<input type="checkbox" class="complete" <% if(this.model.get("complete")) print("checked") %> />' +
        '<% if(this.model.get("complete")) print("<strike>") %>' +
        ' <span class="name"><%= name %></span>' +
        '<% if(this.model.get("complete")) print("</strike>") %>' +
        ' <input type="button" value="Delete" class="delete" />' +
        '<% if(this.model.get("open")) print("<ul><li>" + desc + "</li></ul>") %>' +
        '</li>'),
    events: {
        'change .complete': 'toggleComplete',
        'click .name': 'toggleOpen',
        'click .delete': 'delete',
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        if(this.model.get("hidden")){
            this.$el.attr("style", "display:none;")
        } else {
            this.$el.attr("style", "")
        }
        return this;
    },
    toggleComplete: function(e) {
        this.model.toggleComplete();
        this.render()
    },
    toggleOpen: function(e) {
        this.model.toggleOpen();
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
        this.$el.empty();
        this.collection.forEach(function(todo){
            this.addOne(todo);
        });
        return this;
    },
    addOne: function(todoItem){
        var todoView = new TodoView({model: todoItem})
        this.$el.append(todoView.render().el);
    },
    addAll: function(){
        this.collection.forEach(this.addOne, this)
    }
});
