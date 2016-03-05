class Api::UsersController < ApplicationController

  def create
    if params[:demo] === 'true'

      username = User.new_random_name
      password = '123456'

      @user = User.create(
        username: username,
        password: password
      )

      log_in!(@user)

      @user.make_seed_data_for_demo_user

    else

      @user = User.new(
        username: params[:user][:username],
        password: params[:user][:password]
      )

      if @user.save
        log_in!(@user)
      end

    end

  end

end
