module TimeTools

  extend ActiveSupport::Concern

  def start_time_plus_duration(start_time, duration)
    time_end = to_time(start_time)
    time_end[:mns] += duration.to_i
    while time_end[:mns] >= 60
      time_end[:mns] -= 60
      time_end[:hrs] += 1
    end
    to_string(time_end)
  end

  def to_time(time_string)
    {
      hrs: time_string[0..1].to_i,
      mns: time_string[2..3].to_i
    }
  end

  def to_string(time_obj)

    new_end = time_obj[:mns].to_s
    while new_end.length < 2
      new_end = "0" + new_end
    end

    time_obj[:hrs].to_s + new_end

  end


  def time_spaceship(time_1, time_2)

    case time_1[:hrs] <=> time_2[:hrs]
    when -1
      return -1
    when 0
      return time_1[:mns] <=> time_2[:mns]
    when 1
      return 1
    end

  end

end
