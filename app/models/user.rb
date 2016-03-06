# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  has_many :teams,       foreign_key: :owner_id, dependent: :destroy
  has_many :events,      foreign_key: :owner_id, dependent: :destroy
  has_many :leagues,     foreign_key: :owner_id, dependent: :destroy
  has_many :facilities,  foreign_key: :owner_id, dependent: :destroy

  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user if user && user.is_password?(password)
  end

  def self.new_session_token
    SecureRandom.urlsafe_base64
  end

  def self.new_random_name
    names = ['messi', 'balotelli', 'skrtyl', 'valeri', 'zlatan', 'nagbe', 'busquets']
    name = names.sample + rand(1000).to_s

    until !self.find_by_username(name)
      name = names.sample + rand(1000).to_s
    end

    name

  end

  def ensure_session_token
    self.session_token ||= User.new_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = User.new_session_token
    self.save!
    self.session_token
  end

  def make_seed_data_for_demo_user

    league = League.new(owner_id: self.id, name: 'coed d3', num_games: 8, event_duration: 50)
    league.save

    gen_availability = GeneralAvailability.new(
      positive: true,
      first_date: '2016-06-10',
      last_date: '2016-08-15',
      time_start: '18:25',
      time_end: '22:50',
      day_of_week: 3,
      general_available_id: league.id,
      general_available_type: 'League'
    )

    teams = [
      'Goons',
      'Borbs',
      'Orangutangs',
      'Red Team',
      'Villians',
      'Brews'
    ].map do |team_name|

      Team.new(
        owner_id: self.id,
        name: team_name,
        contact_name: Faker::Name.name,
        phone: Faker::PhoneNumber.cell_phone,
        email: Faker::Internet.email
      )

    end

    facilities = [
      'east',
      'west'
    ].map do |facility_name|

      Facility.new(
        owner_id: self.id,
        name: facility_name
      )

    end

    User.transaction do
      gen_availability.save
      teams.each { |team| team.save }
      facilities.each { |facility| facility.save }
    end

    league.save_facility_memberships(
      facilities.map { |facility| facility.id }
    )

    league.save_team_memberships(
      teams.map { |team| team.id }
    )

    dates = [
      '06/22/2016',
      '06/29/2016',
      '07/06/2016',
      '07/13/2016',
      '07/20/2016',
      '07/27/2016',
      '08/03/2016',
    ]

    times = [
      '1825',
      '1915',
      '2005',
      '2055'
    ]

    count = 0

    events = [
      [0,1],[2,3],[4,5],
      [1,4],[3,5],[0,2],
      [0,3],[1,5],[2,4],
      [0,4],[1,3],[2,5],
      [1,2],[3,4],[0,5]
    ].map do |matchup|

      facility = facilities.pop
      facilities.unshift(facility)

      date = dates[(count/3).to_i]

      time = count % 3
      time = [1,2].sample if time == 2
      time = times[time]

      count += 1

      Event.new(
        owner_id: self.id,
        league_id: league.id,
        num_teams_involved: 2,
        team_1_id: teams[matchup[0]].id,
        team_2_id: teams[matchup[1]].id,
        facility_id: facility.id,
        duration: league.event_duration,
        date: date,
        start_time: time
      )

    end

    User.transaction do
      events.each { |event| event.save }
    end

  end

end
