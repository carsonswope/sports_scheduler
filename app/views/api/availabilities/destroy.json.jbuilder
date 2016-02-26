if @availability

  json.availId @availability.id

  if @availability.class.to_s == 'SpecificAvailability'
    json.availType 'SPECIFIC'
    json.resourceType @availability.specific_available_type
    json.resourceId @availability.specific_available_id

  else
    json.availType 'GENERAL'
    json.resourceType @availability.general_available_type
    json.resourceId @availability.general_available_id

  end
else
  nil
end
