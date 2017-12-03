import Route from '@ember/routing/route';

export default Route.extend({

  beforeModel() {
    // we are doing this cause we are nice :stuck_out_tongue_winking_eye:
    this.transitionTo('calendar.index');
  }

});
