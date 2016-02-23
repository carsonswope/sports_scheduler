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

  include TimeTools

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

  def self.find_by_owner(owner_id)
    Event.where(owner_id: owner_id)
  end

  def participating_teams
    Team.find_by_sql(<<-SQL)
      SELECT *
      FROM teams
      WHERE
        teams.id = #{self.t_2_id} OR
        teams.id = #{self.t_1_id}
    SQL
  end

  def time_end
    start_time_plus_duration(self.start_time, self.duration)
  end

  def time_start_j
    to_time(self.start_time)
  end

  def time_end_j
    to_time(time_end)
  end



end
