class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
    	t.string :name
    	t.decimal :percent_change

      t.timestamps
    end
  end
end
