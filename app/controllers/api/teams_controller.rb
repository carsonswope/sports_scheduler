class Api::TeamsController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @teams = Team.includes(
      :general_availabilities,
      :specific_availabilities
      ).find_by_owner(current_user.id)
  end

  def create
    @team = Team.new(
      name: params.require(:team)[:name],
      contact_name: params.require(:team)[:contact_name],
      phone: params.require(:team)[:phone],
      email: params.require(:team)[:email],
      owner_id: current_user.id
    )

    @team.save

    if params[:team].has_key?(:game_dates)
      dates = params[:team][:game_dates]

      specific = dates.has_key?(:specific) ? params[:team][:game_dates][:specific] : []
      general = dates.has_key?(:general) ? params[:team][:game_dates][:general] : []

      @team.save_availabilities(
        specific, general
      )

    end

    render :show
  end

  def destroy

    @team = Team.find_by_id(params[:id])
    @team.destroy if @team

    render :destroy
  end


end
