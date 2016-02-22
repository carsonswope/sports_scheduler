# SportsScheduler

[Heroku Link][heroku] link shall be here
[heroku]: http://www.herokuapp.com

## Minimum Viable Product

SportsScheduler is a web application built using Ruby on Rails and React. Users are the owners of sports leagues or facilities who need a program that makes it easy and fast to manage their events. SportsScheduler allows users to:

- [ ] create an account
- [ ] log in / log out
- [ ] create facilities, leagues, teams
- [ ] declare the available dates of of said facilities, leagues and teams
- [ ] schedule events which belong to a league, involve at most 2 teams, and take place on a facility(field)
- [ ] export schedules (fetched by facilily, league, team, etc) as json (to feed a 3rd party front end), as excel, or as a simple dedicated html page

[views]: ./wireframes
[components]: ./react-components.md
[stores]: ./flux-stores.md
[API endpoints]: ./api-endpoints.md
[DB Schema]: ./db-schema.md

## Implementation Timeline

### Phase 1: backend setup and user authentication (1 day)

**objective** user rails console/seed file to make model layers, have user sign-in/sign-up

- [ ] create new project
- [ ] create models
- [ ] authentication
- [ ] model associations
- [ ] make basic seed file

### Phase 2: router, controllers (1.5 days)

**objective** user can create/access leagues, teams, facilities, events through api

- [ ] make routes
- [ ] make controllers
- [ ] make custom SQL queries depending on search criteria

### Phase 3: basic navigational components of website (0.5 days)

**objective** user can click through website, and view seed data

- [ ] set up main flux component
- [ ] tab between different modes - schedule, teams, etc

### Phase 4: forms, handle user input (1 day)

**objective** user can also create/destroy new teams, leagues, events, facilities

- [ ] make forms for those various things
- [ ] offer defaults for those forms
- [ ] bonus: default league/event types

### Phase 5: schedule views (0.5 days)

**objective** user can view schedules based on various search criteria

- [ ] offer search criteria which matches api work in phase 2
- [ ] write schedule view markup

### Phase 6: scheduling/rescheduling (1 day)

**objective** notify user when leagues are not fully scheduled, allow them to reschedule/unschedule/schedule games

- [ ] determine criteria for when a league is fully scheduled, based on games/team
- [ ] allow users to reschedule/unschedule/etc inline with the schedule

### Phase 7: pretty up front end (2 days)

**objective** site should look pretty

- [ ] implement transitions, mouse over, mouse-click events

### Bonus features

- [ ] automatically generate schedules
