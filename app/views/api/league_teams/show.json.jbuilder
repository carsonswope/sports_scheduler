if @league_team_membership
  json.leagueId @league_team_membership.league_id
  json.teamId @league_team_membership.team_id
else
  nil
end
