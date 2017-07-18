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

export default Ember.Service.extend({

  search,

  filterToQueryParam(filters, type){
    return filters
      .filter(i => i.type === type)
      .filter(i => i.value)
      .map(i => i.label) || undefined;
  },

  serializeSearchFilter(type, search, params){
    return get(search, 'filter').map(filter => {
      if(filter.type === type){
        let values = get(params, type);
        set(filter, 'value', values ? values.split(',').indexOf( filter.label ) > -1  : true)
      }
      return filter;
    });
  }

});
