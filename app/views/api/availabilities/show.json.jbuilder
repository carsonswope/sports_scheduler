if @available

  json.itemId @available.id
  json.itemType @item_type
  json.availabilities @time_slots do |time_slot|
    json.date time_slot[:date]
    json.startTime time_slot[:time_start]
    json.endTime time_slot[:time_end]
  end

else
  nil
end
