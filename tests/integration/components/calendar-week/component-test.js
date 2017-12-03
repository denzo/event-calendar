import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('calendar-week', 'Integration | Component | calendar week', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const today = moment();

  this.set('startOfWeekDate', today.clone());

  // Template block usage:
  this.render(hbs`
    {{#calendar-week startOfWeekDate=startOfWeekDate as |date index|}}
      <div class="index">{{index}}</div>
    {{/calendar-week}}
  `);

  assert.equal(this.$('div.index').length, 7);
});
