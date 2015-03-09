var Events = Backbone.Collection.extend({
	url: 'http://localhost:54225/api/v1/event',
	model: Event,
	parse: function (res) {
		return res.data;
	}
});