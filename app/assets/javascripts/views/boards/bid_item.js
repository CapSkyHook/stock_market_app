StockMarketApp.Views.BidItemView = Backbone.CompositeView.extend({
	template: JST['boards/bid_item'],

	render: function () {
    	var content = this.template({
    		bid: this.model
    	});

    	this.$el.html(content);
    	return this;
  	},


});