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
		var total = app.posts.length;
		num = 1;
		count += 10;
		numToRender = total - count;
		for (var i = numToRender; i < total; i++) {
			var model = app.posts.at(i);
			var view = new app.BlogPost({model: model});
			$('.blog-posts').prepend(view.el);
		}
		$('.blog-posts').append('<p class="text-center btn-pagination">Older Posts</p>');
	},
	paginate: function() {
		$('.btn-pagination').remove();
		var total = numToRender;
		if (numToRender > 10) {
			numToRender = total - count;
		} else {
			numToRender = 0;
		}
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
		}
		if (numToRender !== 0) {
			$('.blog-posts').append('<p class="text-center btn-pagination">Older Posts</p>');
		}
	},
});