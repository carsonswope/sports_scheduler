class Api::TeamsController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @teams = Team.find_by_owner(current_user.id)
  end

  def create
    @team = Team.new(team_params)
    @team.owner_id = current_user.id
    @team.save
    render :show
  end

  private

  def team_params
    params.require(:team).permit(:name, :contact_name, :email, :phone)
  end

end
