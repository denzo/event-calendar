import Component from '@ember/component';

export default Component.extend({

  classNameBindings: ['isInCurrentMonth::not-in-current-month', 'isToday'],

  /**
   * The displayed date
   *
   * @type {Moment}
   */
  date: null,

  /**
   * A list of events on this day
   *
   * @type {Array.<EventModel>}
   */
  events: null,

  /**
   * @type {Boolean}
   */
  isInCurrentMonth: null,

  /**
   * @type {Boolean}
   */
  isToday: null

});
