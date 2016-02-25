class FixTypo < ActiveRecord::Migration
  def change
    remove_column :general_availabilities, :general_available_type
    add_column :general_availabilities, :general_available_type, :string
  end
end
