var NewTodoView = Backbone.View.extend({
    template: _.template(
        '<form class="newItem">Name:<input type="text" name="newName" /> Description:<input type="text" name="newDesc" /> <input type="submit" class="submit" value="Create New Todo" /></form>'
    ),
    initialize: function(){
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
})
