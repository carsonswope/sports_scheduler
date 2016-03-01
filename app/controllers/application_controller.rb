class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    unless @searched
      @searched = true
      @current_user = User.find_by_session_token(session[:session_token])
    end

    @current_user

  end

  def log_in!(user)
    session[:session_token] = user.session_token
    # debugger
    # session[:session_token] = user.reset_session_token
  end

  def log_out!
    current_user.reset_session_token
    session[:session_token] = nil
  end

  def block_requests_if_not_logged_in
    unless current_user
      render json: {nice_try: 'log in first!'}
    end
  end

end
