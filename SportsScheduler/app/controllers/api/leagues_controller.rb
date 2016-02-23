class Api::LeaguesController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @leagues = League.includes(
      :league_team_memberships,
      :league_facility_memberships
      ).find_by_owner(current_user.id)

  end

end
