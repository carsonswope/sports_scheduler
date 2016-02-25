class CreateGeneralAvailabilities < ActiveRecord::Migration
  def change
    create_table :general_availabilities do |t|

      t.text :notes
      t.boolean :positive
      t.string :day_of_week,  null: false
      t.string :first_date,   null: false
      t.string :last_date,    null: false
      t.string :time_start,   null: false
      t.string :time_end,     null: false

      t.integer :general_available_id,    null: false
      t.integer :general_available_type,  null: false

      t.timestamps null: false
    end

    add_index :general_availabilities, :general_available_id
  end
end
