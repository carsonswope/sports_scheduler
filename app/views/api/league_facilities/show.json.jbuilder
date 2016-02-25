
if @league_facility_membership
  json.leagueId @league_facility_membership.league_id
  json.facilityId @league_facility_membership.facility_id
else
  nil
end
