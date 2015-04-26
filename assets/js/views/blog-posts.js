var app = app || {};

app.BlogPosts = Backbone.View.extend({
	el: '.blog-posts',
	initialize: function() {
		this.addAll();
		this.listenTo(this.collection, 'add', this.addOne)
	},
	addOne: function(model) {
		var view = new app.BlogPost({model: model});
		this.$el.append(view.el);
	},
	addAll: function() {
		this.collection.each(function(model) {
			this.addOne(model);
		}.bind(this));
	},
	quote: function() {
		var posts = this.collection;
		var api = new app.Api();
		api.fetch({
			success: function(data) {
				var title = data.attributes.title;
				var body 	= data.attributes.body;
				
				posts.create({
					title: title,
					body: body,
					timestamp: Firebase.ServerValue.TIMESTAMP
				});

			},
			error: function() {
				console.log('Error');
			}
		});
	},
});