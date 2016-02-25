class FixMoreDataTypes < ActiveRecord::Migration
  def change
    remove_column :general_availabilities, :day_of_week
    add_column :general_availabilities, :day_of_week, :integer
  end
end
