





LEAGUE MANAGEMENT APP

-consumable api for any business that runs sports leagues, etc.
-also website. users pay for regular domain - schedule_party.com/username - for their clients to get schedules
-also offers service for setting up from your dedicated domain
-admin user is administrator of league

User
  -has many leagues

    -league has many courts

      -courts have general availability - ( day of week /
                                            when to when )
      -courts have specific availability -( specific date/
                                            when to when )
      -both contribute to Court#availability

    -league has many teams

      -teams have general availability - defaults to any time the
                                        league is generally available
      -teams have specific availabilities

      -teams have specific unavialabilities

      -(teams have many leagues too - a relationship object is here)

    -league belongs to game_type  (consists of games of
                            a certain length of time - time until next game start time, to be specific)

  -has many games

    -each league has many games

    -each game consists of a lg_id, tm1_id, tm2_id, court, start_time,    start_date

  -has other events - general reservations of time slots, to eliminate      specific availability of the courts at a given time

  -has many courts

    -courts have general availability

    -courts have specific availability

    -courts have specific disavailability

  -basically there will be a 'facilities' resource

    -this sums up the general availability of the facility
      -what courts are there
      -when are they generally available (if you own the place, always available?)

  -there will be an auto-schedule feature, where you can select whichever of your leagues you want - the menu will show the 'completeness factor' with respect to the scheduling of the league - and it will try to auto-complete with the best of its ability, given the available times of each court, and availability of teams and league.

  -
