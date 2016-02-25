Rails.application.routes.draw do

  root to: 'static_pages#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :facilities, only: [:index, :create]
    resources :teams, only: [:index, :create]
    resources :leagues, only: [:index, :create]
    resources :league_teams, only: [:create, :destroy]
    resources :events, only: [:index]
    resource :session, only: [:show, :create, :destroy]
  end

end
