class Api::LeagueTeamsController < ApplicationController

  def create
    @league_team_membership = LeagueTeamMembership.create(league_team_params)

    render :show
  end

  def destroy
    @league_team_membership = LeagueTeamMembership.find_from_league_and_team(league_team_params)[0]
    @league_team_membership.destroy if @league_team_membership

    render :show
  end

  private

  def league_team_params
    params.require(:league_team).permit(:league_id, :team_id)
  end
end
