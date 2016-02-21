# == Schema Information
#
# Table name: general_availabilities
#
#  id                     :integer          not null, primary key
#  notes                  :text
#  positive               :boolean
#  first_date             :string           not null
#  last_date              :string           not null
#  time_start             :string           not null
#  time_end               :string           not null
#  general_available_id   :integer          not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  general_available_type :string
#  day_of_week            :integer
#

require 'test_helper'

class GeneralAvailabilityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
