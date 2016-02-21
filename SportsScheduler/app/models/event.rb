# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  league_id          :integer          not null
#  num_teams_involved :integer          not null
#  t_1_id             :integer
#  t_2_id             :integer
#  facility_id        :integer          not null
#  owner_id           :integer          not null
#  date               :string
#  start_time         :string
#  duration           :string
#

class Event < ActiveRecord::Base

  belongs_to :owner,
    class_name: 'User'

  belongs_to :facility
  belongs_to :league
  belongs_to :t_1,
    foreign_key: :t_1_id,
    class_name: 'Team'

  belongs_to :t_2,
    foreign_key: :t_2_id,
    class_name: 'Team'


  def participating_teams
    Team.find_by_sql(<<-SQL)
      SELECT *
      FROM teams
      WHERE
        teams.id = #{self.t_2_id} OR
        teams.id = #{self.t_1_id}
    SQL
  end

end
