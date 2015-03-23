StockMarketApp.Collections.Stocks = Backbone.Collection.extend({
  model: StockMarketApp.Models.Board,
  
  url: '/stocks',
});

StockMarketApp.Collections.stocks = new StockMarketApp.Collections.Stocks();
