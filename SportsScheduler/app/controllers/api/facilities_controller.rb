class Api::FacilitiesController < ApplicationController

  before_action :block_requests_if_not_logged_in

  def index
    @facilities = Facility.find_by_owner(current_user.id)
  end

end
