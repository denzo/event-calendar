import Route from '@ember/routing/route';

export default Route.extend({

  model({ year }) {
    // ensure that year is 4 digits
    if (/^[0-9]{4}$/.test(year) === false) {
      this.transitionTo('calendar.index');
    }
    return year;
  }

});
