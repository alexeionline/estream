var EventView = Backbone.Marionette.ItemView.extend({

	className: 'eventShort',
	
	template: "#event",

	events: {
		'click': 'showdetails',
		'mouseenter': 'moredetails',
		'mouseleave': 'lessdetails'
	},

	showdetails: function () {
		Backbone.history.navigate("details/" + this.model.id, {trigger: true});
	},

	moredetails: function () {
		var height = this.$el.find('.ev-header img').height();
		this.$el.find('.ev-header').animate({
			'margin-top': -height
		}, 100);
	},

	lessdetails: function () {
		this.$el.find('.ev-header').animate({
			'margin-top': '0'
		}, 100);
	}

});