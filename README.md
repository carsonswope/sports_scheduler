# The Sport Scheduler

[thesportscheduler.com][The Sport Scheduler]
[The Sport Scheduler]: http://www.thesportscheduler.com

The Sport Scheduler is a web application for which makes it easy for managers of sports leagues to quickly schedule their leagues. It was developed using Ruby on Rails and React.js.

## Features

### API endpoints for implementing schedules into another website

The main root page of the Sport Scheduler is merely the editor page, where users can edit their schedules. However, any schedule that is created can be retrieved with an http request to the dedicated 'schedules api'. For example, if your username is 'fun_leagues', and you have a league called 'winter_adult_season', you can make a direct request for that schedule in JSON or a table in plain html:

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

The Sport Scheduler is still in the MVP stage, and is being constantly upgraded with features on features. Some deficiencies in the current implementation are:

- The time range of the Calendar View always defaults from 3:00 PM to 11:00 PM, regardless of when the games being displayed actually take place. This should eventually dynamically update to display all the games in range.

- The date range filter in the Schedules View is guilty of a similar assumption: It defaults to 8 months before now to 8 months after now, when it really ought to dynamically update based on the games being displayed - while giving the user the option to override the time filter.

- Right now there is no distinction between 'current' leagues and ones which have already taken place. If a user has several years worth of leagues stored, and is only concerned with the current league, it would improve the performance of the site to only automatically load and cache the currently relevant leagues, with the option available of looking at older leagues.

Aside from these fixes, coming soon is an auto-schedule feature, which can either make suggestions for new games of unscheduled leagues in a one-by-one or day-by-day format, or simply automatically generate the schedule for a given league or leagues given a set of game dates.

Next, you can expect a 'Webpage' tab to appear, where users will be able to design a custom website around their schedules that their customers will be able to visit, complete with announcements, contact info, and everything else the manager of a sports league would want on their website.

## Technology

- Postgresql
- Ruby on Rails
- React.js
