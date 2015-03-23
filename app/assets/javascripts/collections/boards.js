StockMarketApp.Collections.Boards = Backbone.Collection.extend({
  model: StockMarketApp.Models.Board,
  
  url: '/boards'
});

StockMarketApp.Collections.boards = new StockMarketApp.Collections.Boards();
