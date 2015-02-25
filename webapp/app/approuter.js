var MyRouter = Backbone.Marionette.AppRouter.extend({
  
  routes: {
    "details/:event_id" : "details",
    "addevent" : "addevent"
  },

  details : function(event_id){
    // do something here.
  },

  addevent: function () {

  }

});