exports.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: handlebars.compile('<li>{{ name }}</li>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})
