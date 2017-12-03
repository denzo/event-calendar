import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({

  beforeModel() {
    const now = moment();
    this.transitionTo('calendar.year.month', now.format('YYYY'), now.format('M'));
  }

});
