json.array! @teams do |t|
  json.id t.id
  json.ownerId t.owner_id
  json.name t.name
  json.contactName t.contact_name
  json.phone t.phone
  json.email t.email
end
