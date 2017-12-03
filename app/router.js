import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('calendar', function() {
    this.route('year', { path: ':year' }, function() {
      this.route('month', { path: ':month' });
    });
  });
  this.route('karamba', { path: '/*path' });
});

export default Router;
