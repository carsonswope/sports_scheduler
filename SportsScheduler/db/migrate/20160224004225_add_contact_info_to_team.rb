class AddContactInfoToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :contact_name, :string
    add_column :teams, :phone, :string
    add_column :teams, :email, :string
  end
end
