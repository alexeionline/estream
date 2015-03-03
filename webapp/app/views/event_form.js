var EventFormView = Backbone.Marionette.ItemView.extend({
	className: 'form',
	template: "#event_form",

	ui: {
        'title':        '[name="title"]',
        'descrition':   '[name="descrition"]',
        'lat':          '[name="lat"]',
        'lng':          '[name="lng"]',
        'datetime':     '[name="datetime"]',
        'save':         '[name="save"]',
        'ht':           '[name="ht"]',
        'locationName': '[name="locationName"]',
        'close':        '[name="close"]'
	},

	events: {
		'click @ui.close': 'close',
		'click @ui.save': 'save',
		'mouseleave .field': 'changeField'
	},

	save: function () {
		this.model.save({
            'title':        this.ui.title.val(),
            'description':  this.ui.descrition.val(),
            'lat':          this.ui.lat.val(),
            'lng':          this.ui.lng.val(),
            'locationName': this.ui.locationName.val(),
            'start':        new Date(+this.ui.datetime.val()).toString(),
            'tags':         this.ui.ht.map(function (){
								return $(this).val()
							}).toArray()
		});
	},

	close: function (e) {
		app.layout.addDialog.empty();
		Backbone.history.navigate("/");
	},

	changeField: function (e) {
		var field = $(e.target).data('type');
		var value = $(e.target).find('input').val();

		this.model.set(field, value);
		this.render();
	}
});