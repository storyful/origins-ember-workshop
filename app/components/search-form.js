import Ember from 'ember';

let { get, set, computed, inject } = Ember;

export default Ember.Component.extend({

  formSearchService: inject.service(),

  tagName: 'form',

  init(){
    this._super(...arguments);
    set(this, 'search', get(this, 'formSearchService.search'));
    this.serializeParams( this.get('params') );
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

  serializeParams(){
    const search = get(this, 'search');
    const params = get(this.attrs, 'params');

    const serializeSearchFilter = get(this, 'formSearchService.serializeSearchFilter');

    set(this, 'search.query',     get(this, 'params.query'));
    set(this, 'search.latlng',    get(this, 'params.latlng'));
    set(this, 'search.from_date', get(this, 'params.to_date'));
    set(this, 'search.sort_by',   get(this, 'params.sort_by'));
    set(this, 'search.filter',    serializeSearchFilter('platforms', search, params) );
    set(this, 'search.filter',    serializeSearchFilter('formats', search, params) );
  }

});
