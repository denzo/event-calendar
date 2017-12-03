import { test } from 'qunit';
import moduleForAcceptance from 'animate-from-to/tests/helpers/module-for-acceptance';
import moment from 'moment';

moduleForAcceptance('Acceptance | calendar');

test('visiting /calendar redirects to the current month', function(assert) {
  visit('/calendar');

  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');


  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });
});
