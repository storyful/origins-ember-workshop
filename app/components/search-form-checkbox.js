import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'search-form-checkbox'.w(),

  classNameBindings: 'value:is-checked'.w(),

  click(){
    this.toggleProperty('value');
  }

});
