# == Schema Information
#
# Table name: teams
#
#  id           :integer          not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  owner_id     :integer          not null
#  name         :string           not null
#  contact_name :string
#  phone        :string
#  email        :string
#

class Team < ActiveRecord::Base

  include Available

  belongs_to :owner,
    class_name: 'User'

  has_many :league_team_memberships,
    dependent: :destroy

  has_many :leagues,
    through: :league_team_memberships,
    source: :league

  has_many :events_as_team_1,
    foreign_key: :team_1_id,
    class_name: 'Event',
    dependent: :destroy

  has_many :events_as_team_2,
    foreign_key: :team_2_id,
    class_name: 'Event',
    dependent: :destroy

  def self.find_by_owner(owner_id)
    Team.where(owner_id: owner_id)
  end

  def events
    Event.find_by_sql(<<-SQL)
      SELECT *
      FROM events
      WHERE
        events.team_1_id = #{self.id} OR
        events.team_2_id = #{self.id}
    SQL
  end

  def save_league_memberships(league_ids)
    memberships = league_ids.map do |league_id|
      LeagueTeamMembership.new(
        team_id: self.id,
        league_id: league_id
      );
    end

    LeagueTeamMembership.transaction do
      memberships.each do |m|
        m.save
      end
    end
  end

end
