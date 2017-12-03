import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('calendar-day', 'Integration | Component | calendar day', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const today = moment();
  const date = today.format('D');

  this.set('date', today);

  this.render(hbs`{{calendar-day date=date}}`);

  assert.equal(this.$('[data-test-date]').text().trim(), date);

});
