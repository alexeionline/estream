var app = new Mn.Application();

function loadInitialData () {
	return new Promise(function (resolve, reject) {
		if (true)
			resolve({});
		else 
			reject({})

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
