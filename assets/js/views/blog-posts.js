var app = app || {};

app.BlogPosts = Backbone.View.extend({
	el: '.blog-posts',
	initialize: function() {
		this.read();
	},
	events: {
		'click .btn-pagination' : 'paginate'
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
		num = 1;
		count += 3;
		numToRender = total - count;
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			var view = new app.BlogPost({model: model});
			$('.blog-posts').prepend(view.el);
		};
		$('.blog-posts').append('<p class="text-center btn-pagination">See More</p>');
	},
	paginate: function() {
		var total = numToRender; 
		numToRender = total - count;
		num += 1;
		var page = 'pagination-' + num;
		var pageSelector = '.' + page;
		var element = document.createElement('div');
		$(element).addClass(page);
		$('.blog-posts').append(element);
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			var view = new app.BlogPost({model: model});
			$(pageSelector).prepend(view.el);
		};
		$('.blog-posts').append('<p class="text-center btn-pagination">See More</p>');
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