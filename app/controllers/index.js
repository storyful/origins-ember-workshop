import Ember from 'ember';

function filterToQueryParam(filters, type){
  return filters
    .filter(i => i.type === type)
    .filter(i => i.value)
    .map(i => i.label) || undefined;
}

export default Ember.Controller.extend({

  queryParams: [
    'query',
    'from_date',
    'to_date',
    'platforms',
    'formats',
    'latlng',
    'page',
    'sort_by'
  ],

  searchValues: Ember.computed('queryParams', function(){
    return this.get('queryParams').map(queryParam => {
      return {
        name: queryParam,
        value: this.get(queryParam)
      }
    })
  }),

  actions: {
    updateQueryParams(queryParams){
      this.set('query',     queryParams.query || undefined);
      this.set('latlng',    queryParams.latlng || undefined);
      this.set('latlng',    queryParams.latlng || undefined);
      this.set('from_date', queryParams.from_date || undefined);
      this.set('to_date',   queryParams.to_date || undefined);

      this.set('platforms', filterToQueryParam(queryParams.filter, 'platform') );
      this.set('formats',   filterToQueryParam(queryParams.filter, 'format') );

      this.set('sort_by',   queryParams.sort_by || undefined );
    }
  }

});
