import Route from '@ember/routing/route';
import moment from 'moment';
import { get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';

export default Route.extend({

  /**
  * @return {Moment} Our model is a Moment object assembled from the paramets of the `year` and `month` routes.
  */
  model({ month }) {
    // I'm not a Regex ninja but this works and has tests :ok_hand:
    // We ensure that the month is a valid number from 1 to 12 (leading zeros are not allowed)
    if (/^[1-9]{1}$|^(1[0-2]){1}$/.test(month) === false) {
      this.transitionTo('calendar.index');
    }
    return moment(`${this.modelFor('calendar.year')}-${month}`, 'YYYY-M');
  },

  setupController(controller, model) {
    this._super(controller, model);
    // this will allow us track if the task is running in the template
    set(controller, 'queryEventsTask', get(this, 'queryEventsTask').perform(model));
  },

  /**
   * This concurrency task will retrieve a list of events and then munge them into a dictionary to group
   * the events by date. This will allow us to quickly access all the events.
   *
   * We could pass around the list of all the events and filter them in each calendar day but I believe that
   * creating a disctionary once after the data is retrieved is beneficial for performance.
   *
   * @type {Object}
   */
  queryEventsTask: task(function * (model) {
    const [ queryResult ] = yield Promise.all([
      this.store.query('event', {
        month: model.format('MM'),
        year: model.format('YYYY')
      }),
      timeout(1000) // this is the minum delay
    ]);

    return queryResult;
  }).restartable(),

  /**
   * @param  {Moment} value The date
   * @return {void}
   */
  navigateToMonthlyView(value) {
    this.transitionTo('calendar.year.month', value.format('YYYY'), value.format('M'));
  },


  actions: {

    /**
     * @param  {Moment} value The date to which we need to add 1 month
     * @return {void}
     */
    nextMonth(value) {
      this.navigateToMonthlyView(value.clone().add(1, 'month'));
    },

    /**
     * @param  {Moment} value The date from which we need substract 1 month
     * @return {void}
     */
    previousMonth(value) {
      this.navigateToMonthlyView(value.clone().add(-1, 'month'));
    }

  }

});
