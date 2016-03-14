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
