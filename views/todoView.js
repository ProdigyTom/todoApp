var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<li><%= name %></li>'),
    initialize: function() {
        this.render()
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})
