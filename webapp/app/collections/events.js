var Events = Backbone.Collection.extend({
	url: '/api/v1/event',
	model: Event,
	parse: function (res) {
		return res.data;
	}
});