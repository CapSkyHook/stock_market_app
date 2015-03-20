StockMarketApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'boardsIndex'
  },

  boardsIndex: function () {
    ownBids = StockMarketApp.Collections.boards;
    ownBids.fetch();
    var view = new StockMarketApp.Views.BoardsIndex({
      collection: ownBids
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});