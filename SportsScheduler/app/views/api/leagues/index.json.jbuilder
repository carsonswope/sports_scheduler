json.array! @leagues do |l|
  json.id l.id
  json.ownerId l.owner_id
  json.name l.name
end
