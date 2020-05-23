Rails.application.routes.draw do
  post '/url_data', to: "sites#site_data"
end
