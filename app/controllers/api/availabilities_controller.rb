class Api::AvailabilitiesController < ApplicationController

  def show

    # if Object.const_defined?(params[:resource])
      @available = params[:resource].constantize.find_by_id(params[:id])
    # end

    if @available
      @time_slots = @available.calculate_availabilities
      @item_type = params[:resource]
    end

  end

  def create

    if params[:date][:availType] == 'GENERAL'
      @availability = GeneralAvailability.new(
        first_date: params[:date][:first_date],
        last_date: params[:date][:last_date],
        day_of_week: params[:date][:day_of_week],
        general_available_id: params[:date][:general_available_id],
        general_available_type: params[:date][:general_available_type]
      )
    elsif params[:date][:availType] == 'SPECIFIC'
      @availability = SpecificAvailability.new(
        date: params[:date][:date],
        specific_available_id: params[:date][:specific_available_id],
        specific_available_type: params[:date][:specific_available_type]
      )
    end

    @availability.positive = params[:date][:positive]
    @availability.time_start = params[:date][:time_start]
    @availability.time_end = params[:date][:time_end]

    @availability.save

    render :create

  end

  def destroy

    if params[:availability][:availType] == 'GENERAL'
      @availability = GeneralAvailability.find_by_id(
        params[:availability][:id]
      )
    elsif params[:availability][:availType] == 'SPECIFIC'
      @availability = SpecificAvailability.find_by_id(
        params[:availability][:id]
      )
    end

    @availability.destroy if @availability



  end

end
