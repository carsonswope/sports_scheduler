class AddColumnsToFacilityLeagueTeam < ActiveRecord::Migration
  def change

    #associate current user with all of the main table entries
    add_column :teams, :owner_id, :integer, null: false
    add_index :teams, :owner_id

    add_column :facilities, :owner_id, :integer, null: false
    add_index :facilities, :owner_id

    add_column :leagues, :owner_id, :integer, null: false
    add_index :leagues, :owner_id


    add_column :teams, :name, :string, null: false
    add_index  :teams, :name, unique: true

    add_column :league_team_memberships,
      :league_id, :integer, null: false
    add_column :league_team_memberships,
      :team_id, :integer, null: false

    add_index :league_team_memberships,
      :league_id
    add_index :league_team_memberships,
      [:team_id, :league_id], unique: true

    add_column :facilities, :name, :string, null: false

    create_table :league_facility_memberships do |t|
      t.integer :facility_id, null: false
      t.integer :league_id, null: false

      t.timestamps null: false
    end

    add_index :league_facility_memberships, :facility_id
    add_index :league_facility_memberships,
      [:league_id, :facility_id], unique: true

    create_table :events do |t|
      t.integer :league_id, null: false

      t.integer :num_teams_involved, null: false
      t.integer :t_1_id
      t.integer :t_2_id

      t.integer :facility_id, null: false

      t.date :date
      t.json :start_time
      t.json :duration
    end

    add_index :events, :league_id
    add_index :events, :t_1_id
    add_index :events, :t_2_id
    add_index :events, :facility_id

    add_index :events, :date

  end
end
