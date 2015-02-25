var app = new Mn.Application();

function loadInitialData () {
	return new Promise(function (resolve, reject) {

		app.events = new Events;

		app.events.fetch({
			success: function (data) {
				var eventsView = new EventsView({
					collection: app.events
				});

				$("#ev_place").html(eventsView.render().$el);

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
