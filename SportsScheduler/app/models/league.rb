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

  include Available

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


end
