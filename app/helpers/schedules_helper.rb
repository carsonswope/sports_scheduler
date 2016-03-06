module SchedulesHelper

  def to_view_string(time)
    time[0..1] + ':' + time[2..3]
  end

end
