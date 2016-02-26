class Api::LeaguesController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @leagues = League.includes(
      :league_team_memberships,
      :league_facility_memberships,
      :general_availabilities,
      :specific_availabilities
      ).find_by_owner(current_user.id)
  end

  def create
    @league = League.new(
      name: params.require(:league)[:name],
      num_games: params.require(:league)[:num_games],
      event_duration: params.require(:league)[:event_duration]
    )
    @league.owner_id = current_user.id
    @league.save

    @league.save_availabilities(
      params[:league][:game_dates][:specific],
      params[:league][:game_dates][:general]
    )

    @league.save_facility_memberships(
      params[:league][:facilities]
    )

    render :show
  end

  def destroy

    @league = League.find_by_id(params[:id])
    @league.destroy if @league

    render :destroy
  end


end
