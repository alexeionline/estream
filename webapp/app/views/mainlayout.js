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
		'click @ui.addeventBtn': 'showAddForm',
		'click .hts a': 'tagsearch'
	},

	showAddForm: function (e) {
		e.preventDefault();
		app.router.navigate('addevent', true);
	},

	tagsearch: function (e) {
		e.preventDefault();

		var sds = $(e.target).data('value'); 
		Backbone.history.navigate("tag/" + sds, {trigger: true});
	}
});
