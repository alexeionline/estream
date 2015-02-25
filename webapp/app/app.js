var app = new Mn.Application();

function loadInitialData () {
	return new Promise(function (resolve, reject) {

		var events = new Events;

		events.fetch({
			success: function (data) {
				var eventsView = new EventsView({
					collection: events
				});

				var html = eventsView.render().$el;

				$("#ev_place").html(html);

				resolve({});
			}
		});
	})
} 

// Start history when our application is ready
app.on('start', function() {
	new MyRouter;
	Backbone.history.start();
});

// Load some initial data, and then start our application
loadInitialData().then(function () {
	app.start();
});
