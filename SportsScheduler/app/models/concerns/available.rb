module Available

  extend ActiveSupport::Concern
  include TimeTools

  included do
    has_many :specific_availabilities, as: :specific_available
    has_many :general_availabilities, as: :general_available
  end

  def save_availabilities(specific, general)

    to_save = []

    specific.each do |specific_availability|
      a = SpecificAvailability.new(specific_availability)
      a.specific_available_id = self.id
      a.specific_available_type = self.class.to_s
      to_save.push( a )
    end

    general.each do |general_availability|
      a = GeneralAvailability.new(general_availability)
      a.general_available_id = self.id
      a.general_available_type = self.class.to_s
      to_save.push( a )
    end

    SpecificAvailability.transaction do
      GeneralAvailability.transaction do
        to_save.each { |available| available.save }
      end
    end

  end

  def calculate_availabilities
    specifics = self.specific_availabilities
    generals = self.general_availabilities

    availabilities = []
    negatives = []

    generals.each do |general|
      if general.positive
        availabilities += general.time_slots
      else
        negatives += general.time_slots
      end
    end

    specifics.each do |specific|
      if specific.positive
        availabilities += specific.time_slot
      else
        negatives += specific.time_slot
      end
    end

    negatives.each do |negative|
      availabilities.map! do |otherwise_available_slot|
        difference(otherwise_available_slot, negative)
      end
    end

    availabilities.flatten

  end

  def difference(otherwise_available_slot, negative)
    if negative[:date] == otherwise_available_slot[:date]

      segments = []

      orig_start_time = to_time(otherwise_available_slot[:time_start])
      orig_end_time = to_time(otherwise_available_slot[:time_end])

      minus_start_time = to_time(negative[:time_start])
      minus_end_time = to_time(negative[:time_end])

      if time_spaceship(minus_end_time, orig_end_time) < 0
        new_start = time_spaceship(minus_end_time, orig_start_time) < 0 ?
          orig_start_time : minus_end_time

        segments.push(
          {
            date: otherwise_available_slot[:date],
            time_start: to_string(new_start),
            time_end: to_string(orig_end_time)
          }
        )
      end

      if time_spaceship(minus_start_time, orig_start_time) > 0
        new_end = time_spaceship(minus_start_time, orig_end_time) > 0 ?
           orig_end_time : minus_start_time

        segments.push({
          date: otherwise_available_slot[:date],
          time_start: to_string(orig_start_time),
          time_end: to_string(new_end)
        })
      end

      segments
    else
      otherwise_available_slot
    end

  end


  class_methods do

  end

end
