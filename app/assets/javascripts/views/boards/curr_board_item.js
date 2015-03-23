StockMarketApp.Views.CurrBidView = Backbone.CompositeView.extend({
	template: JST['boards/current_bid_item'],

	initialize: function (options){
		this.percentChange = options.percentChange;
		this.stock = options.stock;
		this.currentBid = options.currentBid;
	},

	render: function () {
		console.log('here')
		var currentBidValue = parseFloat(this.currentBid.get("title"));
		var winner = (currentBidValue === this.percentChange ? true : false)
    	var content = this.template({
    		percentChange: this.percentChange,
    		winner: winner,
    		currentBidValue: currentBidValue
    	});

    	this.$el.html(content);
    	if(this.currentBid){
    		this.$('.no-current-bid').addClass("hideit")
    		this.$('.current-bid').removeClass("hideit");

    	} else {
    		this.$('.current-bid').addClass("hideit");
    		this.$('.no-current-bid').removeClass("hideit");
    	}
    	return this;
  	},


});