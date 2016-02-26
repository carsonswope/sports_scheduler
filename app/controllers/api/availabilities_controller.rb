class Api::AvailabilitiesController < ApplicationController

  def create

    debugger;

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
