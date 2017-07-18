import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'span',

  classNames: 'search-form-sorting-item'.w(),

  classNameBindings: 'isSelected'.w(),

  click(){
    this.set('selected', this.get('value'));
  },

  isSelected: computed('selected', function(){
    return this.get('selected') === this.get('value');
  })

});
