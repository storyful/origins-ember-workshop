import Ember from 'ember';

let { get, set, setProperties, computed, inject } = Ember;

export default Ember.Component.extend({

  formSearchService: inject.service(),

  tagName: 'form',

  init(){
    this._super(...arguments);
    this.resetParams();
    this.serializeParams( this.get('params') );
  },

  didInsertElement(){
    this._super(...arguments);
    this.$('.search-form--input input:first').focus();
  },

  actions: {
    updateSearch(){
      this.sendAction('onSubmit', this.get('search'));
    }
  },

  platformFilters:   computed.filterBy('search.filter', 'type', 'platforms'),
  formatFilters:     computed.filterBy('search.filter', 'type', 'formats'),
  formatFilters:     computed.filterBy('search.filter', 'type', 'formats'),

  hasQueryParams:    computed.notEmpty('search.query'),
  isIdle:            computed.not('loading'),
  canSubmit:         computed.and('hasQueryParams', 'isIdle'),
  isSubmitDisabled:  computed.not('canSubmit'),

  resetParams(){
    set(this, 'search', get(this, 'formSearchService.search'));
  },

  serializeParams(){
    const params    = get(this, 'params');
    const search    = get(this, 'search');
    const normalize = get(this, 'formSearchService.normalize');
    const props     = normalize(search, params);

    setProperties(this, props);
  }

});
