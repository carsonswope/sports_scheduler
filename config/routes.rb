Rails.application.routes.draw do

  root to: 'static_pages#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :facilities, only:        [:index, :create, :destroy]
    resources :teams, only:             [:index, :create, :destroy]
    resources :leagues, only:           [:index, :create, :destroy]
    resources :league_teams, only:      [:create, :destroy]
    resources :league_facilities, only: [:create, :destroy]
    resources :events, only:            [:index, :create, :destroy, :update]
    resources :availabilities, only:    [:create, :destroy, :show]
    resources :users, only:             [:create]
    resource :session, only:            [:show, :create, :destroy]
  end

  resources :schedules, only: [:show]

end
