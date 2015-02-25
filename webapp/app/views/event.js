var EventView = Backbone.Marionette.ItemView.extend({
  template: "#event",

  events: {
  	'click': 'showdetails'
  },

  showdetails: function () {
  	Backbone.history.navigate("details/" + this.model.id, {trigger: true});
  }
});