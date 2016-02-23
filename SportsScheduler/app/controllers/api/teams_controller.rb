class Api::TeamsController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @teams = Team.find_by_owner(current_user.id)
  end

end
