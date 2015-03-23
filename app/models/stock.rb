# == Schema Information
#
# Table name: stocks
#
#  id             :integer          not null, primary key
#  name           :string(255)
#  percent_change :decimal(, )
#  created_at     :datetime
#  updated_at     :datetime
#

class Stock < ActiveRecord::Base
end
