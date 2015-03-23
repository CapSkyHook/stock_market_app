

class StocksController < ApplicationController
	def index
	end

	def show
		render json: {percent_change: 0.12}
	end

end
