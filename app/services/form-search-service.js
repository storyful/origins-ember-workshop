import Ember from 'ember';

const { get, set } = Ember;

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

function filterToQueryParam(filters, type){
  return filters
    .filter(i => i.type === type)
    .filter(i => i.value)
    .map(i => i.label) || undefined;
};

function serializeSearchFilter(type, search, params){
  return get(search, 'filter').map(filter => {
    if(filter.type === type){
      let values = get(params, type);
      set(filter, 'value', values ? values.split(',').indexOf( filter.label ) > -1  : true)
    }
    return filter;
  });
};

export default Ember.Service.extend({

  search,

  serialize(queryParams){
    return {
      query     : queryParams.query     || undefined,
      latlng    : queryParams.latlng    || undefined,
      latlng    : queryParams.latlng    || undefined,
      from_date : queryParams.from_date || undefined,
      to_date   : queryParams.to_date   || undefined,
      sort_by   : queryParams.sort_by   || undefined,
      platforms : filterToQueryParam(queryParams.filter, 'platforms'),
      formats   : filterToQueryParam(queryParams.filter, 'formats')
    };
  },

  normalize(search, params){
    return {
      'search.query':     get(params, 'query'),
      'search.latlng':    get(params, 'latlng'),
      'search.from_date': get(params, 'to_date'),
      'search.sort_by':   get(params, 'sort_by'),
      'search.filter':    serializeSearchFilter('platforms', search, params)
    }
  }

});
