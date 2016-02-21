class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    unless @searched
      @searched = true
      @current_user = User.find_by_session_token(session[:session_token])
    end

    @current_user

  end

  def log_in!(user)
    session[:session_token] = user.reset_session_token
  end

  def log_out!
    current_user.reset_session_token
    session[:session_token] = nil
  end


end
