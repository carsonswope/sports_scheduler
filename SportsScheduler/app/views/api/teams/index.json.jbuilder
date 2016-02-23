json.array! @teams do |t|
  json.id t.id
  json.ownerId t.owner_id
  json.name t.name
end
