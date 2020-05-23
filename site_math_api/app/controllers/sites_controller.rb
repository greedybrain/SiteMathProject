class SitesController < ApplicationController

     def site_data
          result = Site.get_url_data(params[:url_link])
          
          binding.pry
          
          render json: {
               data: result.to_hash
          }
     end

end
