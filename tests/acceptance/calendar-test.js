import { test } from 'qunit';
import moduleForAcceptance from 'event-calendar/tests/helpers/module-for-acceptance';
import moment from 'moment';

moduleForAcceptance('Acceptance | calendar');

test('visiting unrecognised URLs should redirect to the current month', async function(assert) {
  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');

  await visit('/calendar');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/karamba');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
});

test('visiting with invalid date in the URL should gracefully redirect to the current month', async function(assert) {
  const today = moment();
  const year = today.format('YYYY');
  const monthNumber = today.format('M');

  await visit('/calendar/2017/13');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/calendar/2017/0');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/calendar/2017/123');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/calendar/2017/');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);

  await visit('/calendar/20173/5');
  assert.equal(currentURL(), `/calendar/${year}/${monthNumber}`);
});

test('it should display the right month', async function(assert) {
  await visit('/calendar/2017/4');
  assert.equal(find('[data-test-displayed-month]').text().trim(), 'April 2017');
});
