StockMarketApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  className: 'boards-index',

  events: {
    "submit #bet-form": 'submit_allowed'
  },

  initialize: function () {
    this.listenTo(this.collection, "add", this.addBidItem);
    this.firstBid = false;
  },

  render: function () {


    var content = this.template({
    });

    this.$el.html(content);
    this.startTable();

    var current_time = new Date();
    if (current_time.getHours() >= 16 || current_time.getHours() < 9) {
      this.$(".bet-closed-form").addClass("hideit");
      this.$(".already-bet-form").addClass("hideit");
      this.$(".valid-bet-form").removeClass("hideit");
    } else {
      this.$(".bet-closed-form").removeClass("hideit");
      this.$(".valid-bet-form").addClass("hideit");
      this.$(".already-bet-form").addClass("hideit");


    }

    return this;
  },

  submit: function (event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    var model = new StockMarketApp.Models.Board();
    model.set(attrs);
    model.save({}, {
      success: function () {
        $(".bet-input").val("");
        that.collection.fetch();
      }
    });
    
  },

  startTable: function(){
    var view = new StockMarketApp.Views.StartBidItemView({})
    this.addSubview('.bids', view)
  },

  addBidItem: function (bid){
    this.firstBid = true;
    var stock = new StockMarketApp.Models.Stock();
    stock.save();
    var view = new StockMarketApp.Views.BidItemView({
      model: bid,
      stock: stock
    })
    this.addSubview('.bids', view)
  },

  checkPrevBid: function(){
    var sortedBids = this.collection.sortBy('created_at');
    var lastBidTime = this.collection.at(this.collection.length - 1).get("created_at");
    var lastBidDate = new Date(lastBidTime);
    var todayDate = new Date();
    if (lastBidDate.getHours() >= 16 && (lastBidDate.getDate() - todayDate.getDate() <= 1) ||
          lastBidDate.getHours() < 9 && lastBidDate.getDate() === todayDate.getDate() &&
          (lastBidDate.getTime() - todayDate.getTime() < 10800050)){
      return false;
    } else {
      return true;
    }
  },

  submit_allowed: function (event){
    event.preventDefault();
    if (!this.firstBid || this.checkPrevBid()){
      this.firstBid = true;
      this.submit(event);
    } else {
      $(".valid-bet-form").addClass("hideit")
      $(".already-bet-form").removeClass("hideit")
    }
  }
});
