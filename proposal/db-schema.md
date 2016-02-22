```ruby

create_table "events" do |t|
  t.integer "league_id",          null: false,  indexed
  t.integer "num_teams_involved", null: false,  indexed
  t.integer "t_1_id"                            indexed
  t.integer "t_2_id"                            indexed
  t.integer "facility_id",        null: false,  indexed
  t.integer "owner_id",           null: false,  indexed
  t.string  "date"
  t.string  "start_time"
  t.string  "duration"
  t.string  "status"
  t.string  "t_1_score"
  t.string  "t_2_score"
end

create_table "facilities" do |t|
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.integer  "owner_id",   null: false,  indexed
  t.string   "name",       null: false
end

create_table "general_availabilities" do |t|
  t.text     "notes"
  t.boolean  "positive"
  t.string   "first_date",             null: false
  t.string   "last_date",              null: false
  t.string   "time_start",             null: false
  t.string   "time_end",               null: false
  t.integer  "general_available_id",   null: false, indexed
  t.datetime "created_at",             null: false
  t.datetime "updated_at",             null: false
  t.string   "general_available_type"
  t.integer  "day_of_week"
end

create_table "league_facility_memberships" do |t|
  t.integer  "facility_id", null: false, indexed
  t.integer  "league_id",   null: false, indexed
  t.datetime "created_at",  null: false
  t.datetime "updated_at",  null: false
end

create_table "league_team_memberships" |t|
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.integer  "league_id",  null: false,  indexed
  t.integer  "team_id",    null: false,  indexed
end


create_table "leagues" |t|
  t.string   "name",       null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.integer  "owner_id",   null: false,  indexed
end

create_table "specific_availabilities" |t|
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

create_table "teams", force: :cascade do |t|
  t.datetime "created_at",   null: false
  t.datetime "updated_at",   null: false
  t.integer  "owner_id",     null: false,  indexed
  t.string   "name",         null: false
  t.string   "contact_name"
  t.string   "contact_phone"
  t.string   "contact_email"
end

create_table "users", force: :cascade do |t|
  t.string   "username",        null: false
  t.string   "password_digest", null: false
  t.string   "session_token",   null: false
  t.datetime "created_at",      null: false
  t.datetime "updated_at",      null: false
  t.string   "contact_info"
  t.string   "company_info"
end

class Event < ActiveRecord::Base
  belongs_to :owner,
    class_name: 'User'

  belongs_to :facility
  belongs_to :league
  belongs_to :t_1,
    foreign_key: :t_1_id,
    class_name: 'Team'

  belongs_to :t_2,
    foreign_key: :t_2_id,
    class_name: 'Team'
end

class Facility < ActiveRecord::Base
  include Available

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :leage_facility_memberships
  has_many :leagues,
    through: :league_facility_memberships,
    source: :league

  has_many :events
end

class GeneralAvailability < ActiveRecord::Base
  validates :first_date, :last_date, :time_start,
    :time_end, :day_of_week, presence: true

  belongs_to :general_available,
    polymorphic: true, dependent: :destroy
end


class LeagueFacilityMembership < ActiveRecord::Base
  belongs_to :facility, dependent: :destroy
  belongs_to :league,   dependent: :destroy
end

class LeagueTeamMembership < ActiveRecord::Base
  belongs_to :league, dependent: :destroy
  belongs_to :team,   dependent: :destroy
end

class League < ActiveRecord::Base

  include Available

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :league_facility_memberships
  has_many :facilities,
    through: :league_facility_memberships,
    source: :facility

  has_many :events

  has_many :league_team_memberships
  has_many :teams,
    through: :league_team_memberships,
    source: :team
end

class SpecificAvailability < ActiveRecord::Base

  validates :date, :time_start, :time_end, presence: true

  belongs_to :specific_available,
    polymorphic: true, dependent: :destroy
end

class Team < ActiveRecord::Base

  include Available

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :league_team_memberships
  has_many :leagues,
    through: :league_team_memberships,
    source: :league

  has_many :events_as_t_1,
    foreign_key: :t_1_id,
    class_name: 'Team'

  has_many :events_as_t_2,
    foreign_key: :t_2_id,
    class_name: 'Team'

  def events
    Event.find_by_sql(<<-SQL)
      SELECT *
      FROM events
      WHERE
        events.t_1_id = #{self.id} OR
        events.t_2_id = #{self.id}
    SQL
  end
end

module Available

  extend ActiveSupport::Concern

  included do
    has_many :specific_availabilities, as: :specific_available
    has_many :general_availabilities, as: :general_available
  end
end

```
