var EventFormView = Backbone.Marionette.ItemView.extend({
	className: 'form',
	template: "#event_form",

	ui: {
        'title':      '[name="title"]',
        'descrition': '[name="descrition"]',
        'save':       '[name="save"]'
	},

	events: {
		'click @ui.save': 'save'
	},

	save: function () {
		this.model.save({
			'title':      this.ui.title.val(),
        	'description': this.ui.descrition.val()
		});
	}
});