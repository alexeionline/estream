var EventsView = Backbone.Marionette.CompositeView.extend({
  template: "#events",
  childView: EventView,
  childViewContainer: ".evs",
});