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

      @demo = true

      @user.make_seed_data_for_demo_user

    else

      @user = User.new(
        username: params[:user][:username],
        password: params[:user][:password]
      )

      if @user.save
        log_in!(@user)
      else

        if @user.errors.full_messages[0].start_with?('Password is too short')
          render json: ['Password must be 6 characters'], status: 422
        else
          render json: @user.errors.full_messages, status: 422
        end
        
      end

      @demo = false

    end

  end

end
