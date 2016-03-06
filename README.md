# The Sport Scheduler

[thesportscheduler.com][The Sport Scheduler]
[The Sport Scheduler]: http://www.thesportscheduler.com

The Sport Scheduler is a web application for which makes it easy for managers of sports leagues to quickly schedule their leagues. It was developed using Ruby on Rails and React.js.

## Features

### API endpoints for implementing schedules into another website

The main root page of the Sport Scheduler is merely the editor portion of the Scheduler. Any schedule that is created can be retrieved with an http request to the dedicated 'schedules api'. For example, if your username is 'fun_leagues', and you have a league called 'winter_adult_season', you can make a direct request for that schedule in JSON or just plain html:

```sh
  http://www.thesportscheduler/schedules/fun_leagues?league=winter_adult_season
  http://www.thesportscheduler/schedules/fun_leagues?league=winter_adult_season&format=json
```

This also works for 'team' and 'field' parameters.

### Tour for demo users

To show brand new users the sheer power of the Sport Scheduler, there is an option on the login screen for a demo account. The demo account comes with a pre-assembled 6 team league. The games in the league are halfway scheduled, and if users take the tour, it will walk them through the process of scheduling new games in the league.

### Team, League, and Field management

At the heart of the Sport Scheduler are associations between Teams, Leagues and Fields. Leagues have a list of Teams, as well as a list of Fields. Leagues also can be customized to include a set of 'game dates', which is the list of times when that league's games typically are played.

### Schedule interface

There are two ways to view schedules, List View and Calendar View. The list view shows games in a table, in sequential order, and the Calendar View shows games in a more visual way by making a timeline for every game day and then placing the game on that timeline accordingly. You can filter schedules by date, league, team, and day of week. The 'add a game' feature is built in to the Schedules page, so you can add games while looking on the schedule for conflicts and openings.

## Features still to come

The Sport Scheduler is still in the MVP stage, and is being constantly upgraded with features on features. Coming soon is an auto-schedule feature, which can either make suggestions for new games in unscheduled leagues in a one-by-one or day-by-day format, or simply automatically generate the schedule for a given league or leagues given a set of game dates.  

## Technology

- Postgresql
- Ruby on Rails
- React.js
