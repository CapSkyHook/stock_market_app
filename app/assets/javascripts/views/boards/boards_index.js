StockMarketApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  className: 'boards-index',

  events: {
    "submit #bet-form": 'submit_allowed',
    "click .prev-bet-title": "togglePreviousBets"
  },

  initialize: function (options) {
          var that = this;
    this.stocks = options.stocks.fetch({
     success: function () {that.checkWinner();}

    })
    this.listenTo(this.collection, "add", this.addBidItem);
    this.firstBid = false;
  },

  render: function () {
    var that = this;

    var content = this.template({

    });

    this.$el.html(content);
    this.startTable();
    var current_time = new Date();
    if (current_time.getHours() >= 16 || current_time.getHours() < 9) {
      this.$(".bet-closed-form").addClass("hideit");
      this.$(".already-bet-form").addClass("hideit");
      this.$(".valid-bet-form").removeClass("hideit");
    } else if (current_time.getHours() === 4 && current_time.getMinutes() === 30){
      stock = new StockMarketApp.Models.Stock();

      stock.save({},{
        success: function (){ that.checkWinner(); }
      });
    } else {
      this.$(".bet-closed-form").removeClass("hideit");
      this.$(".valid-bet-form").addClass("hideit");
      this.$(".already-bet-form").addClass("hideit");
    }

    return this;
  },

  checkWinner: function () {
    
    var stock = StockMarketApp.Collections.stocks.last();
    var percentChange = parseFloat(stock.get("percent_change"));
    var currBid = StockMarketApp.Collections.boards.last() || null;
    if (currBid){var bidChange = parseFloat(currBid.get("title"))};
    // this.addCurrBid(percentChange, stock, currBid);
  },


  addCurrBid: function (percentChange, stock, currBid){
    var currentBid = (currBid ? currBid : null);
    var view = new StockMarketApp.Views.CurrBidView({
      percentChange: percentChange,
      stock: stock,
      currentBid: currentBid
    })
    this.addSubview('.curr-bet', view)
  },

  submit: function (event){
    var that = this;
    event.preventDefault();
    stock = new StockMarketApp.Models.Stock();
    stock.save();
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
    var view = new StockMarketApp.Views.BidItemView({
      model: bid,
      stock: this.stock
    })
    this.addSubview('.bids', view)
  },

  checkBidValidity: function (lastBidDate){
    var todayDate = new Date();
    if (lastBidDate.getHours() >= 16 && (lastBidDate.getDate() - todayDate.getDate() <= 1) ||
          lastBidDate.getHours() < 9 && lastBidDate.getDate() === todayDate.getDate() &&
          (lastBidDate.getTime() - todayDate.getTime() < 10800050)){
      return false;
    } else {
      return true;
    }
  },

  checkPrevBid: function(){
    var sortedBids = this.collection.sortBy('created_at');
    var lastBidTime = this.collection.at(this.collection.length - 1).get("created_at");
    var lastBidDate = new Date(lastBidTime);
    this.checkBidValidity(lastBidDate);
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
  },

  togglePreviousBets: function (){
    $('.bids').toggleClass("hideit")
  }
});
