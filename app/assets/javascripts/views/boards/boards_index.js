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
    var current_time = new Date();
    if (current_time.getHours() < 16 && current_time.getMinutes() < 30 ||
        current_time.getHours() > 9) {
      this.$(".bet-closed-form").addClass("hideit");
      this.$(".valid-bet-form").removeClass("hideit");
    } else {
      this.$(".bet-closed-form").removeClass("hideit");
      this.$(".valid-bet-form").addClass("hideit");
    }

    return this;
  },

  submit: function (event){
    event.preventDefault();
    // var model = new StockMarketApp.Models
    
  },

  addBidItem: function (bid){
    var view = new StockMarketApp.Views.BidItemView({
      model: bid
    })
    this.addSubview('.bids', view)
  }
});
