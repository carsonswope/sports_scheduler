json.array! @leagues do |l|
  json.id l.id
  json.ownerId l.owner_id
  json.name l.name
  json.teams l.league_team_memberships.map { |t| t.team_id }
  json.facilities l.league_facility_memberships.map { |f| f.facility_id }
end
