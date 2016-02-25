class TypoInSpecificAvailability < ActiveRecord::Migration
  def change
    remove_column :specific_availabilities, :specific_available_type
    add_column :specific_availabilities, :specific_available_type, :string

  end
end
