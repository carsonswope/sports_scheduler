class ChangeIndexOnLeagues < ActiveRecord::Migration
  def change
    remove_index :leagues, column: :name
  end
end
