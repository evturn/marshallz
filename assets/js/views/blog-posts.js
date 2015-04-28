var app = app || {};

app.BlogPosts = Backbone.View.extend({
	el: '.blog-posts',
	initialize: function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.read();
	},
	events: {
		'click .post-content' : 'getLength'
	},
	addOne: function(model) {
		var view = new app.BlogPost({model: model});
		this.$el.prepend(view.el);
	},
	addAll: function() {
		this.collection.each(function(model) {
			this.addOne(model);
		}.bind(this));
	},
	read: function() {
		count = 0;
		setTimeout(this.getLength, 3000);
	},
	getLength: function() {
		var total = app.posts.length;
		console.log(app.posts);
		console.log(total);
		count += 3;
		var numToRender = total - count;
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			console.log(model);
		};
		console.log('we need to start with model ' + total + ' and end at model ' + numToRender);

	}

/*	

	To make client side requests:

	quote: function() {
		var posts = this.collection;
		var api = new app.Api();
		api.fetch({
			success: function(data) {
				var title  = data.attributes.title;
				var body = data.attributes.body;

				if (title.length > 1) {

					posts.create({
						title: title,
						body: body,
						timestamp: Firebase.ServerValue.TIMESTAMP
					});

				} else {

					return;
				}
			},
			error: function() {
				console.log('Error');
			}
		});
	}, */

});