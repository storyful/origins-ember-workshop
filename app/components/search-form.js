import Ember from 'ember';

let { get, set, computed } = Ember;

function serializeSearchFilter(type, search, params){
  return get(search, 'filter').map(filter => {
    if(filter.type === type){
      let values = get(params, type);
      set(filter, 'value', values ? values.split(',').indexOf( filter.label ) > -1  : true)
    }
    return filter;
  });
}

const search = {
  query: '',
  latlng: '',
  from_date: '',
  to_date: '',
  filter: [
    { type: 'platforms', label: 'Instagram', icon: 'instagram', value: true },
    { type: 'platforms', label: 'YouTube',   icon: 'youtube', value: true },
    { type: 'platforms', label: 'Facebook',  icon: 'facebook', value: true },
    { type: 'platforms', label: 'Twitter',   icon: 'twitter', value: true },
    { type: 'formats',   label: 'Video',     icon: 'video-camera', value: true },
    { type: 'formats',   label: 'Image',     icon: 'picture-o', value: true }
  ],
  sort_by: 'date'
};

export default Ember.Component.extend({

  tagName: 'form',

  init(){
    this._super(...arguments);
    set(this, 'search', search);
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

    set(this, 'search.query',     get(this, 'params.query'));
    set(this, 'search.latlng',    get(this, 'params.latlng'));
    set(this, 'search.from_date', get(this, 'params.to_date'));
    set(this, 'search.sort_by',   get(this, 'params.sort_by'));
    set(this, 'search.filter',    serializeSearchFilter('platforms', search, params) );
    set(this, 'search.filter',    serializeSearchFilter('formats', search, params) );
  }

});
