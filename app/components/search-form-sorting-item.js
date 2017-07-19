import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'span',

  classNames: 'search-form-sorting-item'.w(),

  classNameBindings: 'isSelected'.w(),

  click(){
    const props = this.getProperties('value', 'toggleValue', 'selected');

    const newSelected = props.toggleValue ?
                        (props.selected === props.value) ? props.toggleValue : props.value :
                        props.value;

    this.set('selected', newSelected);
  },

  isSelected: computed('selected', function(){
    const props = this.getProperties('value', 'toggleValue', 'selected');

    return props.toggleValue ?
           (props.selected === props.value || props.selected === props.toggleValue) :
           (props.selected === props.value);
  }),

  isReversed: computed('selected', function(){
    return this.get('value').substring(0,1) === '-';
  }),

  isToggled: computed('selected', function(){
    return this.get('selected') === this.get('toggleValue')
  })

});
