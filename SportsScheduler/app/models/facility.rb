# == Schema Information
#
# Table name: facilities
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#  name       :string           not null
#

class Facility < ActiveRecord::Base

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :leage_facility_memberships
  has_many :leagues,
    through: :league_facility_memberships,
    source: :league

  has_many :events

  has_many :specific_availabilities, as: :specific_available
  has_many :general_availabilities,  as: :general_available

end
