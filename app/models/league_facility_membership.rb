# == Schema Information
#
# Table name: league_facility_memberships
#
#  id          :integer          not null, primary key
#  facility_id :integer          not null
#  league_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class LeagueFacilityMembership < ActiveRecord::Base

  belongs_to :facility
  belongs_to :league

  def self.find_from_league_and_facility(params)

    LeagueFacilityMembership.find_by_sql(<<-SQL)
      SELECT *
      FROM league_facility_memberships
      WHERE
        league_facility_memberships.league_id = #{params[:league_id]} AND
        league_facility_memberships.facility_id = #{params[:facility_id]}

    SQL
  end

end
