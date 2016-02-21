# == Schema Information
#
# Table name: general_availabilities
#
#  id                     :integer          not null, primary key
#  notes                  :text
#  positive               :boolean
#  first_date             :string           not null
#  last_date              :string           not null
#  time_start             :string           not null
#  time_end               :string           not null
#  general_available_id   :integer          not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  general_available_type :string
#  day_of_week            :integer
#

class GeneralAvailability < ActiveRecord::Base

  validates :first_date, :last_date, :time_start,
    :time_end, :day_of_week, presence: true

  belongs_to :general_available,
    polymorphic: true, dependent: :destroy

  def time_slots
    slots = [];

    first = Date.parse(self.first_date)
    last = Date.parse(self.last_date)

    until first > last
      if first.wday == self.day_of_week
        slots.push(
          {
            date: first,
            time_start: time_start,
            time_end: time_end
          }
        )
        first = first + 7
      else
        first = first + 1
      end
    end

    slots
  end

end
