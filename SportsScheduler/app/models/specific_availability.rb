# == Schema Information
#
# Table name: specific_availabilities
#
#  id                      :integer          not null, primary key
#  notes                   :text
#  positive                :boolean
#  date                    :string           not null
#  time_start              :string           not null
#  time_end                :string           not null
#  specific_available_id   :integer          not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  specific_available_type :string
#

class SpecificAvailability < ActiveRecord::Base

  validates :date, :time_start, :time_end, presence: true

  belongs_to :specific_available,
    polymorphic: true, dependent: :destroy

  def time_slot
    return [{
      date: Date.parse(self.date),
      time_start: self.time_start,
      time_end: self.time_end
    }]
  end

end
