var AppLayoutView = Backbone.Marionette.LayoutView.extend({
  	template: "#layout",

	regions: {
		addDialog: "#addDialog",
		details: "#details"
	},

	ui: {
		'addeventBtn': '.addevent'
	},

	events: {
		'click @ui.addeventBtn': 'showAddForm'
	},

	showAddForm: function (e) {
		e.preventDefault();
		app.router.navigate('addevent', true);
	}
});
