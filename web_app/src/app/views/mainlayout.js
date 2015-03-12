var AppLayoutView = Backbone.Marionette.LayoutView.extend({
  	template: "#layout",

	regions: {
		addDialog: "#addDialog",
		details: "#details"
	},

	ui: {
		'addeventBtn': '.addevent',
		'loginStatus': '#status',
		'fblogin': '#fblogin'
	},

	initialize: function (opt) {
		var th = this;

		this.fbuser = opt.fbuser;

		app.vent.on('user:fblogin:status', function (e) {
			th.ui.loginStatus.html(e.message);
		});
	},

	events: {
		'click @ui.addeventBtn': 'showAddForm',
		'click @ui.fblogin': 'fblogin',
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
	},

	fblogin: function () {
		this.fbuser.login();
	}
});
