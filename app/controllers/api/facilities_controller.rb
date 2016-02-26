class Api::FacilitiesController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @facilities = Facility.find_by_owner(current_user.id)
  end

  def create
    @facility = Facility.new(facility_params)
    @facility.owner_id = current_user.id
    @facility.save

    render :show
  end

  def destroy

    @facility = Facility.find_by_id(params[:id])
    @facility.destroy if @facility

    render :destroy
  end

  private

  def facility_params
    params.require(:facility).permit(:name)
  end

end
