# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_23_231353) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sites", force: :cascade do |t|
    t.string "url_link"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "alexa_rank"
    t.string "rev_per_day"
    t.string "rev_per_month"
    t.string "rev_per_year"
    t.string "pg_views_per_day"
    t.string "pg_views_per_month"
    t.string "pg_views_per_year"
    t.string "pg_visits_per_day"
    t.string "pg_visits_per_month"
    t.string "pg_visits_per_year"
    t.string "overall_site_worth"
  end

end
