var Event = Backbone.Model.extend({
	idAttribute: '_id',
	url: '/api/v1/event',
	defaults: {
		tags: []
	}
});