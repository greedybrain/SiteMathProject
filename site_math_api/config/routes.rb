Rails.application.routes.draw do
  resources :sites, only: :index
  post 'url_data', to: "sites#site_data"
end
