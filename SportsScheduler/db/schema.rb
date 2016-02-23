# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160223175313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.integer "league_id",          null: false
    t.integer "num_teams_involved", null: false
    t.integer "facility_id",        null: false
    t.integer "owner_id",           null: false
    t.string  "date"
    t.string  "start_time"
    t.string  "duration"
    t.integer "team_1_id"
    t.integer "team_2_id"
  end

  add_index "events", ["facility_id"], name: "index_events_on_facility_id", using: :btree
  add_index "events", ["league_id"], name: "index_events_on_league_id", using: :btree
  add_index "events", ["owner_id"], name: "index_events_on_owner_id", using: :btree
  add_index "events", ["team_1_id"], name: "index_events_on_team_1_id", using: :btree
  add_index "events", ["team_2_id"], name: "index_events_on_team_2_id", using: :btree

  create_table "facilities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "owner_id",   null: false
    t.string   "name",       null: false
  end

  add_index "facilities", ["owner_id"], name: "index_facilities_on_owner_id", using: :btree

  create_table "general_availabilities", force: :cascade do |t|
    t.text     "notes"
    t.boolean  "positive"
    t.string   "first_date",             null: false
    t.string   "last_date",              null: false
    t.string   "time_start",             null: false
    t.string   "time_end",               null: false
    t.integer  "general_available_id",   null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "general_available_type"
    t.integer  "day_of_week"
  end

  add_index "general_availabilities", ["general_available_id"], name: "index_general_availabilities_on_general_available_id", using: :btree

  create_table "league_facility_memberships", force: :cascade do |t|
    t.integer  "facility_id", null: false
    t.integer  "league_id",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "league_facility_memberships", ["facility_id"], name: "index_league_facility_memberships_on_facility_id", using: :btree
  add_index "league_facility_memberships", ["league_id", "facility_id"], name: "index_league_facility_memberships_on_league_id_and_facility_id", unique: true, using: :btree

  create_table "league_team_memberships", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "league_id",  null: false
    t.integer  "team_id",    null: false
  end

  add_index "league_team_memberships", ["league_id"], name: "index_league_team_memberships_on_league_id", using: :btree
  add_index "league_team_memberships", ["team_id", "league_id"], name: "index_league_team_memberships_on_team_id_and_league_id", unique: true, using: :btree

  create_table "leagues", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "owner_id",   null: false
  end

  add_index "leagues", ["name"], name: "index_leagues_on_name", unique: true, using: :btree
  add_index "leagues", ["owner_id"], name: "index_leagues_on_owner_id", using: :btree

  create_table "specific_availabilities", force: :cascade do |t|
    t.text     "notes"
    t.boolean  "positive"
    t.string   "date",                    null: false
    t.string   "time_start",              null: false
    t.string   "time_end",                null: false
    t.integer  "specific_available_id",   null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "specific_available_type"
  end

  add_index "specific_availabilities", ["specific_available_id"], name: "index_specific_availabilities_on_specific_available_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "owner_id",   null: false
    t.string   "name",       null: false
  end

  add_index "teams", ["name"], name: "index_teams_on_name", unique: true, using: :btree
  add_index "teams", ["owner_id"], name: "index_teams_on_owner_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
