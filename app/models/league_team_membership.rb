# == Schema Information
#
# Table name: league_team_memberships
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  league_id  :integer          not null
#  team_id    :integer          not null
#

class LeagueTeamMembership < ActiveRecord::Base

  belongs_to :league
  belongs_to :team

  def self.find_from_league_and_team(params)
    LeagueTeamMembership.where(
      league_id: params[:league_id],
      team_id: params[:team_id]
    )
  end

end
