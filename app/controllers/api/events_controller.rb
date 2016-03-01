class Api::EventsController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @events = Event.find_by_owner(current_user.id)
  end

  def create
    @event = Event.new(event_create_params)
    @event.owner_id = current_user.id
    @event.num_teams_involved = 2
    @event.save

    render :show
  end

  def update

    @event = Event.find_by_id(params[:id])
    @event.update(event_patch_params)

    render :show
  end

  def destroy
    @event = Event.find_by_id(params[:id])
    @event.destroy
    render :show
  end

  def event_patch_params
    params.require(:event).permit(:facility_id, :start_time, :date)
  end

  def event_create_params
    params.require(:event).permit(
      :facility_id,
      :start_time,
      :date,
      :league_id,
      :team_1_id,
      :team_2_id,
      :start_time,
      :duration
      )
  end

end
