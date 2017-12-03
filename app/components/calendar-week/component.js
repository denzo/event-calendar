import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from 'ember-decorators/object';

export default Component.extend({

  /**
   * @type {Moment}
   */
  startOfWeekDate: null,

  /**
   * This will create an array with all the dates in a week based on the `startOfWeekDate`
   * 
   * @type {Array.<Moment>}
   */
  @computed('startOfWeekDate')
  get weekDays() {
    const startOfWeekDateIterator = get(this, 'startOfWeekDate').clone();
    const result = [];

    while (result.length < 7) {
      result.push(startOfWeekDateIterator.clone());
      startOfWeekDateIterator.add(1, 'day');
    }

    return result;
  }

});
