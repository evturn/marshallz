var app = app || {};

app.BlogPosts = Backbone.View.extend({
	el: '.blog-posts',
	initialize: function() {
		this.read();
		// this.listenTo(this.collection, 'add', this.addOne);
	},
	events: {
		'click .post-content' : 'paginate'
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
		console.log('total ', total);
		count += 3;
		numToRender = total - count;
		console.log('numToRender', numToRender);
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			var view = new app.BlogPost({model: model});
			$('.blog-posts').prepend(view.el);
		};
	},
	paginate: function() {
		var total = numToRender; 
		numToRender = total - count;
		console.log('numToRender', numToRender);
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			var view = new app.BlogPost({model: model});
			$('.blog-pagination').append(view.el);
		};
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