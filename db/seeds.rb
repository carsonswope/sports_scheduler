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

l = League.create(owner_id: u.id, name: 'mens d2', num_games: 8, event_duration: 50 )

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

# l.save_availabilities(specific, general)

t1 = Team.create(owner_id: u.id, name: 'goons', contact_name: 'bill', email: 'bill@gmail.com', phone: '503-555-5555')
t2 = Team.create(owner_id: u.id, name: 'borbs', contact_name: 'bob', email: 'bob@gmail.com', phone: '503-999-9999')
t3 = Team.create(owner_id: u.id, name: 'poops', contact_name: 'george', email: 'george@gmail.com', phone: '503-222-2222')
t4 = Team.create(owner_id: u.id, name: 'worms', contact_name: 'tom', email: 'tom@gmail.com', phone: '503-888-2222')
t5 = Team.create(owner_id: u.id, name: 'octopus', contact_name: 'ooba', email: 'ooba@gmail.com', phone: '503-222-9874')
t6 = Team.create(owner_id: u.id, name: 'blobs', contact_name: 'b. blob', email: 'ooaa@gmail.com', phone: '503-221-1234')

l.save_team_memberships([t1.id, t2.id, t3.id, t4.id, t5.id, t6.id])

l.save_facility_memberships([f1.id, f2.id])

Event.create(
  owner_id: u.id,
  league_id: l.id,
  num_teams_involved: 2,
  team_1_id: t1.id,
  team_2_id: t2.id,
  facility_id: f1.id,
  date: '07/05/2016',
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
  date: '07/05/2016',
  start_time: '2005',
  duration: '50'
)
