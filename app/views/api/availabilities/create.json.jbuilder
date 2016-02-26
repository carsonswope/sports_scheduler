if @availability.persisted?

  json.id @availability.id
  json.startTime @availability.time_start
  json.endTime @availability.time_end
  json.positive @availability.positive
  json.notes @availability.notes

  if @availability.class.to_s == 'SpecificAvailability'
    json.availType 'SPECIFIC'
    json.resourceType @availability.specific_available_type
    json.resourceId @availability.specific_available_id
    json.date @availability.date

  else
    json.availType 'GENERAL'
    json.resourceType @availability.general_available_type
    json.resourceId @availability.general_available_id
    json.startDate @availability.first_date
    json.endDate @availability.last_date

    json.dayOfWeek @availability.day_of_week

  end
else
  nil
end
