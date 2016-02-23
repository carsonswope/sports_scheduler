Rails.application.routes.draw do

  root to: 'static_pages#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :facilities, only: [:index]
    resources :teams, only: [:index]
    resources :leagues, only: [:index]
    resources :events, only: [:index]
    resource :session, only: [:show, :create, :destroy]
  end

end
