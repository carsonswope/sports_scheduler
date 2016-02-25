class AddColumnsToLeagues < ActiveRecord::Migration
  def change
    add_column :leagues, :num_games, :integer
    add_column :leagues, :event_duration, :integer
  end
end
