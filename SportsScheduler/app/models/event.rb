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
#  date               :date
#  start_time         :json
#  duration           :json
#  owner_id           :integer          not null
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

end
