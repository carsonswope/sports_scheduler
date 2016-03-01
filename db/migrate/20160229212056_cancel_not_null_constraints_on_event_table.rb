class CancelNotNullConstraintsOnEventTable < ActiveRecord::Migration
  def change
    change_column :events, :facility_id, :integer, null: true
  end
end
