class SitesController < ApplicationController

     def index 
          sites = Site.all.order("url_link")
          render json: sites
     end

     def site_data
          result = Site.get_url_data(params[:url_link])
          
          site_data = Site.find_or_create_by(
               url_link: params[:url_link],
               overall_site_worth: result["Estimated worth of this website:"],
               rev_per_day: result["Estimated revenue per day:"],
               rev_per_month: result["Estimated revenue per month:"],
               rev_per_year: result["Estimated revenue per year:"],
               pg_views_per_day: result["Estimated pageviews per day:"],
               pg_views_per_month: result["Estimated pageviews per month:"],
               pg_views_per_year: result["Estimated pageviews per year:"],
               pg_visits_per_day: result["Estimated visits per day:"],
               pg_visits_per_month: result["Estimated visits per month:"],
               pg_visits_per_year: result["Estimated visits per year:"],
               alexa_rank: result["Alexa Global Rank for the last 3 months:"]
          )

          render json: site_data
     end

end

