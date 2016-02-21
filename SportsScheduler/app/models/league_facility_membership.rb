# == Schema Information
#
# Table name: league_facility_memberships
#
#  id          :integer          not null, primary key
#  facility_id :integer          not null
#  league_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class LeagueFacilityMembership < ActiveRecord::Base

  belongs_to :facility, dependent: :destroy
  belongs_to :league,   dependent: :destroy

end
