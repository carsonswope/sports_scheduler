class ChangeColumnNamesInEvents < ActiveRecord::Migration
  def change
    remove_column :events, :t_1_id
    remove_column :events, :t_2_id
    add_column :events, :team_1_id, :integer
    add_column :events, :team_2_id, :integer
    add_index :events, :team_1_id
    add_index :events, :team_2_id
  end
end
