import Component from '@ember/component';
import moment from 'moment';
import { get, getProperties } from '@ember/object';
import { computed } from 'ember-decorators/object';
import { makeArray } from '@ember/array';


export default Component.extend({

  /**
   * The date that contains the month and year that we are displaying.
   *
   * @type {Moment}
   */
  date: null,

  /**
   * A list of events to be displayed.
   *
   * @type {Array.<EventModel>}
   */
  events: null,

  /**
   * The format that is used on a Moment to match a key in `eventsByDay`
   *
   * @type {[type]}
   */
  format: 'YYYY-MM-DD',

  /**
   * the key in the disctionary is a string of the date in a special format and the value is the array of events
   *
   * @type {Object}
   */
  @computed('events.@each.launchDate', 'format')
  get eventsByDay() {
    const { events, format } = getProperties(this, 'events', 'format');

    return events.reduce((result, event) => {
      const key = moment(get(event, 'launchDate')).format(format);
      result[key] = makeArray(result[key]).addObject(event); // could this be more Ember :joy:
      return result;
    }, {});
  },

  /**
   * It is cheaper to create one instance of today here instead of `calendar-day` component. Performance :muscle:
   *
   * @type {Moment}
   */
  @computed()
  get today() {
    return moment();
  },

  /**
   * As we display days outside of the current month we need to determine the very first date.
   *
   * @type {Moment}
   */
  @computed('date')
  get firstDay() {
    const localeStartOfWeek = moment.localeData().firstDayOfWeek();
    let firstDay = get(this, 'date').clone().startOf('month');

    while ((firstDay.isoWeekday() % 7) !== localeStartOfWeek) {
      firstDay.add(-1, 'day');
    }
    return firstDay;
  },

  /**
   * As we display days outside of the current month we need to determine what the very last day.
   *
   * @type {Moment}
   */
  @computed('date')
  get lastDay() {
    const localeStartOfWeek = moment.localeData().firstDayOfWeek();
    let lastDay = get(this, 'date').clone().endOf('month');
    let localeEndOfWeek = (localeStartOfWeek + 6) % 7;
    while ((lastDay.isoWeekday() % 7) !== localeEndOfWeek) {
      lastDay.add(1, 'day');
    }
    return lastDay;
  },

  /**
   * A list of start dates for all the weeks in the month.
   *
   * @type {Array.<Moment>}
   */
  @computed('firstDay', 'lastDay')
  get weeks() {
    const { firstDay, lastDay } = getProperties(this, 'firstDay', 'lastDay');
    const current = firstDay.clone();
    const result = [];

    while (current.isBefore(lastDay)) {
      result.push(current.clone());
      current.add(1, 'week');
    }
    return result;
  }

});
