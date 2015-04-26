var app = app || {};

app.BlogPosts = Backbone.View.extend({
	el: '.blog-posts',
	initialize: function() {
		this.addAll();
	},
	addOne: function(model) {
		var view = new app.BlogPost(model: model);
		this.$el.append(view.el);
	},
	addAll: function() {
		this.collection.each(function(model) {
			this.addOne(model);
		}.bind(this));
	},
});