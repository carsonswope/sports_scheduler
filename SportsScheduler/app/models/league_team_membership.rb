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

end
