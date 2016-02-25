if @league.persisted?
  json.id @league.id
  json.ownerId @league.owner_id
  json.name @league.name
else
  nil
end
