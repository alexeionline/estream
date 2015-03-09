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
		'blur [data-type]': 'changeMode',
		'click .addHT': 'addHT'
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

	addHT: function () {
		var nweht = this.ui.ht.val();

		if (nweht) {
			this.model.get('tags').push(nweht);
			this.render();
		}
	},

	close: function (e) {
		app.layout.addDialog.empty();
		Backbone.history.navigate("/");
	},

	changeMode: function (e) {
		var input = $(e.target);
		var field = input.data('type');
		var value = input.val();

		console.log(value);

		this.model.set(field, value);
		this.render();
	}
});