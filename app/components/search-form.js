import Ember from 'ember';

let { get, set } = Ember;

function serializeSearchFilter(type, search, params){
  return get(search, 'filter').map(filter => {
      if(filter.type === type){
        set(filter, 'value', get(params, type).split(',').indexOf( filter.label ) > -1)
      }
      return filter;
    })
}

export default Ember.Component.extend({

  search: {
    query: '',
    latlng: '',
    from_date: '',
    to_date: '',
    filter: [
      { type: 'platforms', label: 'Instagram', value: true },
      { type: 'platforms', label: 'YouTube',   value: true },
      { type: 'platforms', label: 'Facebook',  value: true },
      { type: 'platforms', label: 'YouTube',   value: true },
      { type: 'platforms', label: 'Twitter',   value: true },
      { type: 'formats',   label: 'Video',     value: true },
      { type: 'formats',   label: 'Image',     value: true }
    ],
    sort_by: 'newest'
  },

  didReceiveAttrs(){
    this._super(...arguments);
    this.serializeParams( this.get('params') );
  },

  actions: {
    updateSearch(){
      this.sendAction('onUpdate', this.get('search'));
    },

    updateSortBy(value){
      this.set('search.sort_by', value);
      this.sendAction('updateSearch');
    }
  },

  platformFilters: Ember.computed.filterBy('search.filter', 'type', 'platforms'),

  formatFilters: Ember.computed.filterBy('search.filter', 'type', 'formats'),

  serializeParams(){
    this.set('search.query',      this.get('params.query'));
    this.set('search.latlng',     this.get('params.latlng'));
    this.set('search.from_date',  this.get('params.to_date'));
    this.set('search.sort_by',    this.get('params.sort_by'));

    this.set('search.filter', serializeSearchFilter('platforms', this.get('search'), this.get('params')) );
    this.set('search.filter', serializeSearchFilter('formats', this.get('search'), this.get('params')) );
  }

});
