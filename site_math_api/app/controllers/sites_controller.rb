class SitesController < ApplicationController

     def site_data
         result = Site.get_url_data(link)
         render json: {
              data: result.to_hash
         }
     end

end
