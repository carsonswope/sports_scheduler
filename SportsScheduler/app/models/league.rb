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

  def save_facility_memberships(facility_ids)
    memberships = facility_ids.map do |facility_id|
      LeagueFacilityMembership.new(
        league_id: self.id,
        facility_id: facility_id
      )
    end

    LeagueFacilityMembership.transaction do
      memberships.each do |m|
        m.save
      end
    end
  end

  def save_team_memberships(team_ids)
    memberships = team_ids.map do |team_id|
      LeagueTeamMembership.new(
        league_id: self.id,
        team_id: team_id
      )
    end

    LeagueTeamMembership.transaction do
      memberships.each do |m|
        m.save
      end
    end
  end

end
