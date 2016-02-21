# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#  name       :string           not null
#

class Team < ActiveRecord::Base

  include Available

  belongs_to :owner,
    class_name: 'User',
    dependent: :destroy

  has_many :league_team_memberships
  has_many :leagues,
    through: :league_team_memberships,
    source: :league

  has_many :events_as_t_1,
    foreign_key: :t_1_id,
    class_name: 'Team'

  has_many :events_as_t_2,
    foreign_key: :t_2_id,
    class_name: 'Team'

end
