class CreateLeagueTeamMemberships < ActiveRecord::Migration
  def change
    create_table :league_team_memberships do |t|

      t.timestamps null: false
    end
  end
end
