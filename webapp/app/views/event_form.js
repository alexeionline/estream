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
        'close':        '[name="close"]'
	},

	events: {
		'click @ui.close': 'close',
		'click @ui.save': 'save'
	},

	save: function () {
		this.model.save({
            'title':        this.ui.title.val(),
            'description':  this.ui.descrition.val(),
            'lat':          this.ui.lat.val(),
            'lng':          this.ui.lng.val(),
            'start':        new Date(+this.ui.datetime.val()).toString(),
            'tags':         this.ui.ht.map(function (){
								return $(this).val()
							}).toArray()
		});
	},

	close: function (e) {
		app.layout.addDialog.empty();
		Backbone.history.navigate("/");
	}
});