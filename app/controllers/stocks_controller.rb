class StocksController < ApplicationController
	def index
		data = YahooFinance.quotes(["^GSPC"], [:change_in_percent])[0]
		render json: data
	end

	def create
		data = YahooFinance.quotes(["^GSPC"], [:change_in_percent])[0][:change_in_percent]
		render json: data
	end

	def show
		data = YahooFinance.quotes(["^GSPC"], [:change_in_percent])[0][:change_in_percent]
		render json: data
	end
end
