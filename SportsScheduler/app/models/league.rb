# == Schema Information
#
# Table name: leagues
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#

class League < ActiveRecord::Base

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :league_facility_memberships
  has_many :facilities,
    through: :league_facility_memberships,
    source: :facility

  has_many :events

  has_many :league_team_memberships
  has_many :teams,
    through: :league_team_memberships,
    source: :team

  has_many :specific_availabilities, as: :specific_available
  has_many :general_availabilities,  as: :general_available

end
