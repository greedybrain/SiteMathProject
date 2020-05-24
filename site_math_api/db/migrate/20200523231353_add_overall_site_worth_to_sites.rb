class AddOverallSiteWorthToSites < ActiveRecord::Migration[6.0]
  def change
    add_column :sites, :overall_site_worth, :string
  end
end
