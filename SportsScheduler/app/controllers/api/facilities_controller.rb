class Api::FacilitiesController < ApplicationController
  def index

    @facilities = Facility.find_by_owner(current_user.id)

  end
end
