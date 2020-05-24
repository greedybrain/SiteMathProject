class AddColumnsToSites < ActiveRecord::Migration[6.0]
  def change
    # //
    add_column :sites, :alexa_rank, :string
    # //
    add_column :sites, :rev_per_day, :string
    add_column :sites, :rev_per_month, :string
    add_column :sites, :rev_per_year, :string
    # //
    add_column :sites, :pg_views_per_day, :string
    add_column :sites, :pg_views_per_month, :string
    add_column :sites, :pg_views_per_year, :string
    # //
    add_column :sites, :pg_visits_per_day, :string
    add_column :sites, :pg_visits_per_month, :string
    add_column :sites, :pg_visits_per_year, :string
  end
end
