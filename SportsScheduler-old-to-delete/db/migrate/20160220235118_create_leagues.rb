class CreateLeagues < ActiveRecord::Migration
  def change
    create_table :leagues do |t|
      t.string :name, null: false
      t.timestamps null: false
    end

    add_index :leagues, :name, unique: true
  end
end
