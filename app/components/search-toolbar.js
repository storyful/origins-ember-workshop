import Ember from 'ember';

export default Ember.Component.extend({

  search: {
    query: '',
    latlng: '',
    date: '',
    filter: [
      { type: 'platform', label: 'Instagram', value: true },
      { type: 'platform', label: 'YouTube',   value: true },
      { type: 'platform', label: 'Facebook',  value: true },
      { type: 'platform', label: 'YouTube',   value: true },
      { type: 'platform', label: 'Twitter',   value: true },
      { type: 'format',   label: 'Video',     value: true },
      { type: 'format',   label: 'Image',     value: true }
    ],
  },

  platformFilters: Ember.computed.filterBy('search.filter', 'type', 'platform'),

  formatFilters: Ember.computed.filterBy('search.filter', 'type', 'format')

});
