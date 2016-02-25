class Api::SessionsController < ApplicationController
  def show
    render :show
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    log_in!(user) if user

    render :show
  end

  def destroy
    log_out! if current_user
    render :show
  end
end
