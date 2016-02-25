if @team.persisted?
  json.id @team.id
  json.ownerId @team.owner_id
  json.name @team.name
  json.contactName @team.contact_name
  json.phone @team.phone
  json.email @team.email
else
  nil
end
