var MyRouter = Backbone.Marionette.AppRouter.extend({
  
	routes: {
		"details/:event_id" : "details",
		"addevent" : "addevent"
	},

	details : function(event_id){
		var eventDetails = new EventFullView({
			model: app.events.get(event_id)
		});

		app.layout.details.show(eventDetails);

	},

	addevent: function () {
		var view = new EventFormView({
			model: new Event
		});

		app.layout.addDialog.show(view);

	}

});