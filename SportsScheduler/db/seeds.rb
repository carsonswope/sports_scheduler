# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Facility.destroy_all
Event.destroy_all
GeneralAvailability.destroy_all
LeagueFacilityMembership.destroy_all
LeagueTeamMembership.destroy_all
League.destroy_all
SpecificAvailability.destroy_all
Team.destroy_all

User.destroy_all
u = User.create(username: 'me', password: '123456')

f1 = Facility.create(owner_id: u.id, name: 'east')
f2 = Facility.create(owner_id: u.id, name: 'west')

l = League.create(owner_id: u.id, name: 'mens d2' )

specific = [
  {
    date: '5/5/2016',
    time_start: '1625',
    time_end: '2055',
    positive: true
  },
  {
    date: '10/5/2016',
    time_start: '1000',
    time_end: '1900',
    positive: false
  }
]
general = [
  {
    day_of_week: 2,
    first_date: '1/5/2016',
    last_date: '5/7/2016',
    time_start: '1625',
    time_end: '2240',
    positive: true
  }
]

l.save_availabilities(specific, general)

t1 = Team.create(owner_id: u.id, name: 'goons', contact_name: 'bill', email: 'bill@gmail.com', phone: '503-555-5555')
t2 = Team.create(owner_id: u.id, name: 'borbs', contact_name: 'bob', email: 'bob@gmail.com', phone: '503-999-9999')

l.save_team_memberships([t1.id, t2.id])
l.save_facility_memberships([f1.id, f2.id])

Event.create(
  owner_id: u.id,
  league_id: l.id,
  num_teams_involved: 2,
  team_1_id: t1.id,
  team_2_id: t2.id,
  facility_id: f1.id,
  date: '7/5/2016',
  start_time: '1915',
  duration: '50'
)

Event.create(
  owner_id: u.id,
  league_id: l.id,
  num_teams_involved: 2,
  team_1_id: t1.id,
  team_2_id: t2.id,
  facility_id: f1.id,
  date: '7/5/2016',
  start_time: '2005',
  duration: '50'
)
