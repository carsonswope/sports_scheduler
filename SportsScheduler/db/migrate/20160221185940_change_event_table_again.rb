class ChangeEventTableAgain < ActiveRecord::Migration
  def change
    remove_column :events, :end_time
    add_column :events, :duration, :string
  end
end
