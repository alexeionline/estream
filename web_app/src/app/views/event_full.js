var EventFullView = Backbone.Marionette.ItemView.extend({
	template: "#event_full",
	className: 'eventFull',

	events: {
		'click': 'close'
	},

	close: function () {
		app.layout.details.empty();
		Backbone.history.navigate("/");
	}

});