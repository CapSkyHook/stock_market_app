window.StockMarketApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new StockMarketApp.Routers.Router;
    Backbone.history.start();
  }
};
