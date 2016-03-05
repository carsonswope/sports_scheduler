class RemoveNameIndexOnLeagues < ActiveRecord::Migration
  def change
    remove_index :teams, column: :name
    add_index :teams, [:name, :owner_id], unique: true
    add_index :leagues, [:name, :owner_id], unique: true
  end
end
