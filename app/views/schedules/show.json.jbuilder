json.array! @events do |event|

  if event.start_time.length === 0 || event.date.length === 0
    json.time 'unscheduled'
    json.date 'unscheduled'
    json.field 'unscheduled'
  else
    json.time to_view_string(event.start_time)
    json.date event.date
    json.field event.facility.name
  end

  json.id event.id
  json.homeTeam event.team_1.name
  json.awayTeam event.team_2.name
  json.league event.league.name

end
