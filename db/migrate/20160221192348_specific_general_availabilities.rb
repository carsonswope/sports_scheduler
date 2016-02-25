class SpecificGeneralAvailabilities < ActiveRecord::Migration
  def change

    create_table :specific_availabilities do |t|

      t.text :notes
      t.boolean :positive
      t.string :date, null: false
      t.string :time_start, null: false
      t.string :time_end, null: false

      t.integer :specific_available_id, null: false
      t.integer :specific_available_type, null: false

      t.timestamps null: false
    end

    add_index :specific_availabilities, :specific_available_id
  end
end
