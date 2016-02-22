Rails.application.routes.draw do

  root to: 'static_pages#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :facilities, only: [:index]
    resource :session, only: [:show, :create, :destroy]
  end

end
