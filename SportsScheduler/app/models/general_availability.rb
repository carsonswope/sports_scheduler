class GeneralAvailability < ActiveRecord::Base

  belongs_to :general_available,
    polymorphic: true, dependent: :destroy

end
