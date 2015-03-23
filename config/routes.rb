TrelloClone::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session
  resources :stocks

  resources :boards 
end
