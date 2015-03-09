var Event = Backbone.Model.extend({
	idAttribute: '_id',
	url: '/api/v1/event',
	defaults: {
		title: '',
		description: '',
		tags: [],
		locationName: '',
		datetime: ''
	}
});