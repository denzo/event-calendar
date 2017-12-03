import moment from 'moment';
import Response from 'ember-cli-mirage/response';
import { isPresent } from '@ember/utils';

export default function() {

  this.get('/events', ({ events }, { queryParams: { year, month } }) => {
    if (isPresent(year) && isPresent(month)) {
      const query = moment(`${year}-${month}`, 'YYYY-MM');
      return events.all().filter((event) => {
        const launchDate = moment(event.launch_date, 'YYYY-MM-DD');
        return launchDate.isSame(query, 'year') && launchDate.isSame(query, 'month');
      });
    } else {
      return new Response(400);
    }
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
