StockMarketApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  className: 'boards-index',

  events: {
    "submit #bet-form": 'submit'
  },

  initialize: function () {
    this.listenTo(this.collection, "add", this.addBidItem);

  },

  render: function () {


    var content = this.template({
    });

    this.$el.html(content);
        // this.$(".post-pic").attr("style", "");


    return this;
  },

  submit: function (event){
    event.preventDefault();
    
  },

  addBidItem: function (bid){
    var view = new StockMarketApp.Views.BidItemView({
      model: bid
    })
    this.addSubview('.bids', view)
  }
});
