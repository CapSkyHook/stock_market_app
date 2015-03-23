class StocksController < ApplicationController
	def index
		@stocks = Stock.all
		render json: @stocks
	end

	 def create
	    @stock = Stock.new
	    data = YahooFinance.quotes(["^GSPC"], [:change_in_percent])[0][:change_in_percent]
	    @stock.percent_change = data

	    if @stock.save
	      render json: @stock
	    else
	      render json: @stock.errors.full_messages, status: :unprocessable_entity
	    end
  	end

	def show
		@stock = Stock.find(params[:id])
      render json: @stock
	end
end
