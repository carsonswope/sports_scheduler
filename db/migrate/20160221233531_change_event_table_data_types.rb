class ChangeEventTableDataTypes < ActiveRecord::Migration
  def change
    remove_column :events, :date
    remove_column :events, :start_time
    remove_column :events, :duration

    add_column :events, :date, :string
    add_column :events, :start_time, :string
    add_column :events, :duration, :string
  end
end
