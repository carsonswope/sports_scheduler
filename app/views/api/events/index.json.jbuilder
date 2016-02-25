json.array! @events do |e|
  json.id e.id
  json.ownerId e.owner_id
  json.team_1_id e.team_1_id
  json.team_2_id e.team_2_id
  json.date e.date
  json.startTime e.start_time
  json.duration e.duration
  json.endTime e.time_end
  json.facilityId e.facility_id
  json.leagueId e.league_id
end
