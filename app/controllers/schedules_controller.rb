class SchedulesController < ApplicationController



  def show

    @user = User.find_by_username(params[:id])

    if @user
      @events = Event.includes(:team_1, :team_2,
        :league, :facility).find_by_owner(@user.id)
    end

    @params = {}

    if params[:team]
      @params[:team] = params[:team]
      @events = @events.to_a.reject do |event|
        event.team_1.name != params[:team] &&
        event.team_2.name != params[:team]
      end
    end

    if params[:league]
      @params[:league] = params[:league]
      @events = @events.to_a.reject do |event|
        event.league.name != params[:league]
      end
    end

    if params[:field]
      @params[:field] = params[:field]
      @events = @events.to_a.reject do |event|
        event.facility.name != params[:field]
      end
    end



  render '/schedules/show.html.erb'

  end

end
