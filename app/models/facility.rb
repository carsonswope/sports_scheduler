# == Schema Information
#
# Table name: facilities
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#  name       :string           not null
#

class Facility < ActiveRecord::Base

  include Available

  belongs_to :owner,
    class_name: 'User'

  has_many :league_facility_memberships,
    dependent: :destroy

  has_many :leagues,
    through: :league_facility_memberships,
    source: :league

  has_many :events,
    dependent: :destroy

  def self.find_by_owner(owner_id)
    Facility.where(owner_id: owner_id)
  end

end
