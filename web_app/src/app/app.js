var app = new Mn.Application();

function loadInitialData () {
	return new Promise(function (resolve, reject) {

		app.events = new Events;

		app.events.fetch({
			complete: function (data) {
				resolve({});
			}
		});
	})
} 

// Start history when our application is ready
app.on('start', function() {
	app.user = new User;
	
	app.layout = new AppLayoutView({
		fbuser: app.user
	});
	
	app.router = new MyRouter;

	app.layout.render().$el.appendTo('body');

	var eventsView = new EventsView({
		collection: app.events
	});

	$("#ev_place").html(eventsView.render().$el);

	Backbone.history.start({pushState: true});
});

// Load some initial data, and then start our application
loadInitialData().then(function () {
	app.start();
});
