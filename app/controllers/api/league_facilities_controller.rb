class Api::LeagueFacilitiesController < ApplicationController

  def create
    @league_facility_membership = LeagueFacilityMembership.create(league_facility_params)
    render :show
  end

  def destroy

    @league_facility_membership = LeagueFacilityMembership.find_from_league_and_facility(league_facility_params)[0]

    @league_facility_membership.destroy if @league_facility_membership
    render :show
  end

  private

  def league_facility_params
    params.require(:league_facility).permit(:league_id, :facility_id)
  end
end
