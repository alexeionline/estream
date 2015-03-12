var User = Backbone.Model.extend({

	initialize: function () {
		this.login();
	},

	login: function () {
		var m = this;

		FB.getLoginStatus(function(response) {
			m.statusChangeCallback(response);
		});
	},

	statusChangeCallback: function(response) {
		if (response.status === 'connected') {

			FB.api('/me', function(res) {
				app.vent.trigger('user:fblogin:status', {
					message: 'Thanks for logging in !'
				});
			});
		} else if (response.status === 'not_authorized') {
			app.vent.trigger('user:fblogin:status', {
				message: 'Please log into this app.'
			});
		} else {
			app.vent.trigger('user:fblogin:status', {
				message: 'Please log into Facebook.'
			});
		}
	}
});