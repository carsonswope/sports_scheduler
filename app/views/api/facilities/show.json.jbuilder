if @facility.persisted?
  json.id @facility.id
  json.ownerId @facility.owner_id
  json.name @facility.name
else
  nil
end
