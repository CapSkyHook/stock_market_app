StockMarketApp.Collections.Boards = Backbone.Collection.extend({
  model: StockMarketApp.Models.Board,
  
  url: '/boards',

  comparator: function(board) {
      return board.get("created_at");
    }
});

StockMarketApp.Collections.boards = new StockMarketApp.Collections.Boards();
