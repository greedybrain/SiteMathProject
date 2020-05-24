require "nokogiri"
require "open-uri"

class Site < ApplicationRecord
     # validate :url_link, presence :true

     def self.get_url_data(link)

          url = "https://www.worthofweb.com/website-value/#{link}/"
          
          begin 
               doc = Nokogiri::HTML(open(url))
          rescue SocketError
               invalid_message = "That link doesn't exist"
               raise invalid_message
          rescue Errno::ENOENT
               invalid_message = "Please recheck that link and try again"
               raise invalid_message
          end
          
          data_field = []
          assoc = {}
          doc.css("div.side-left p").each do |data|
               data_field << data.text
          end
          
          
          i = 0 
          info = data_field[0..-5]
          while i < info.count
               assoc[info[i]] = info[i + 1]
               i += 2
          end
          assoc
     end
end
