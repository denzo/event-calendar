# event-calendar

Demo is available at [http://event-calendar.s3-website-us-west-1.amazonaws.com/](http://event-calendar.s3-website-us-west-1.amazonaws.com/)

## How it works

* the routes are setup in the `app/router.js` and structured in a way that helps to handle all unrecognised URLs.
* `month`'s route model is a Moment object which is created from parsing a string. The string itself is assembled from dynamic URL segments (year and month). The route's model resolves synchronously.
* The dynamic segments are validated with `Regex`. If invalid we redirect to `calendar.index` route which is used for all unhandled URLs. It then redirects to the current month.
* In the `setupController` hook of the `month`'s route we set `queryEventsTask` property on the controller to make it available within our template. The task performs the data fetching based on the resolved model (Moment). As the task has a derived state like `isRunning` we are able to indicate to the user that we are loading the events and allow the user to interact with the application if needed without blocking the UI.
* The task fetches the data and groups the events by day. Which will allow us quick access to the events within each rendered calendar day.
* ember-cli-mirage is used to mock the API for `event` model.

### Components

* `calendar-container` serves as a wrapper for the content of the whole route. This gives us flexibility to setup custom styles and add additional logic if needed.
* `calendar-month` is rendered when the `queryEventsTask` is resolved. The responsility of the `calenar-month` component is to calculate the following:
    * `firstDay` and `lastDay`. As the calendar month displays days outside of the currently displayed month we need to determine what they are.
    * The above values are then used to create `weeks`, an array with week start dates.
* `calendar-week` is rendered by `calendar-month` and requires `startOfWeekDate`. Based on that value `weekDays` property creates an array of the dates for the week.
    * Please note that `calendar-week` does not render anything but instead it iterates over the `weekDays` and `yield`s those dates. This gives us ability to render each day however we want. We utilise that to render the weekday names.
* `calendar-day` takes the following:
    * `date` the date it is rendering
    * `events` the events are retrieved from the `eventsByDay` dictionary that we prepared earlier. We are able to efficiently access the events for the day by using the `get` helper.
    * `isInCurrentMonth` which is used to style the days outside of the currently displayed month.
    * `isToday` is also used to use a specific style.
 


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd event-calendar`
* `yarn` or `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test --server`
