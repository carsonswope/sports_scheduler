json.array! @facilities do |f|
  json.id f.id
  json.ownerId f.owner_id
  json.name f.name

  json.events f.events do |e|
    json.startTime e.time_start_j
    json.endTime e.time_end_j
    json.date e.date
  end

end
