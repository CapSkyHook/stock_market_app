StockMarketApp.Views.StartBidItemView = Backbone.CompositeView.extend({
	template: JST['boards/start_bid_item'],

	render: function () {
    	var content = this.template({});

    	this.$el.html(content);
    	return this;
  	},


});