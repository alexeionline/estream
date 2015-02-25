var MyRouter = Backbone.Marionette.AppRouter.extend({
  
	routes: {
		"details/:event_id" : "details",
		"addevent" : "addevent"
	},

	details : function(event_id){
		var curevent = app.events.get(event_id);

		var ev = new EventFullView({
			model: curevent
		});

		$("#ev_details").html(ev.render().$el);
	},

	addevent: function () {

		var model = new Event;

		var view = new EventFormView({
			model: model
		});

		var html = view.render().$el;

		$("#form_place").html(html);

		console.log($("#form_place"));
	}

});