import Route from '@ember/routing/route';

export default Route.extend({

  beforeModel() {
    // as this is the only thing we have in the app may as well go there by default :boom:
    this.transitionTo('calendar');
  }

});
