class AddOwnerIdToEvent < ActiveRecord::Migration
  def change
    add_column :events, :owner_id, :integer, null: false
    add_index :events, :owner_id
  end
end
