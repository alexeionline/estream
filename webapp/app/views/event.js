var EventView = Backbone.Marionette.ItemView.extend({

	className: 'eventShort',
	
	template: "#event",

	events: {
		'click': 'showdetails'
	},

	showdetails: function () {
		Backbone.history.navigate("details/" + this.model.id, {trigger: true});
	}
});