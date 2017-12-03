import DS from 'ember-data';

export default DS.Model.extend({
  launchDate: DS.attr('date'),
  title: DS.attr('string')
});
