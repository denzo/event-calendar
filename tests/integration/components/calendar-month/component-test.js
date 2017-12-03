import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('calendar-month', 'Integration | Component | calendar month', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const date = moment('2017-12', 'YYYY-M');

  this.set('date', date);

  this.render(hbs`{{calendar-month date=date}}`);

  assert.equal(this.$('[data-test-calendar-day-index="0-0"]').text().trim(), 26);

});
