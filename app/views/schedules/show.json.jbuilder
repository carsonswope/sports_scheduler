json.array! @events do |event|
  json.id event.id
  json.homeTeam event.team_1.name
  json.awayTeam event.team_2.name
  json.date event.date
  json.time to_view_string(event.start_time)
  json.league event.league.name
  json.field event.facility.name
end
