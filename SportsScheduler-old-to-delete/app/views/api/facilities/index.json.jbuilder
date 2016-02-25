json.array! @facilities do |f|
  json.id f.id
  json.ownerId f.owner_id
  json.name f.name
end
