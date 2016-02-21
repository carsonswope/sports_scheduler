class SpecificAvailability < ActiveRecord::Base

  belongs_to :specific_available,
    polymorphic: true, dependent: :destroy

end
