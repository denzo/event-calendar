import { test } from 'qunit';
import moduleForAcceptance from 'event-calendar/tests/helpers/module-for-acceptance';
import moment from 'moment';

moduleForAcceptance('Acceptance | calendar');

test('visiting unrecognised URLs should redirect to the current month', function(assert) {
  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');

  visit('/calendar');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/karamba');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });
});

test('visiting with invalid date in the URL should gracefully redirect to the current month', function(assert) {
  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');

  visit('/calendar/2017/13');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/calendar/2017/0');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/calendar/2017/123');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/calendar/2017/');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });

  visit('/calendar/20173/5');
  andThen(function() {
    assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
  });
});

test('it should display the right month', function(assert) {
  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');

  visit('/calendar/2017/4');
  andThen(function() {
    assert.equal(find('[data-test-displayed-month]').text().trim(), 'April 2017');
  });
});
