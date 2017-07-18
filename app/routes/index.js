import Ember from 'ember';
import RouteLoadingMixin from '../mixins/route-loading-mixin'

const { get, set, setProperties, inject } = Ember;

export default Ember.Route.extend(RouteLoadingMixin, {

  formSearchService: inject.service(),

  queryParams: {
    query:     { refreshModel: true },
    from_date: { refreshModel: true },
    to_date:   { refreshModel: true },
    platforms: { refreshModel: true },
    formats:   { refreshModel: true },
    latlng:    { refreshModel: true },
    sort_by:   { refreshModel: true }
  },

  beforeModel(){
    this.store.unloadAll('content');
  },

  model(params){
    let hash = { params };

    if(params.query){
      hash.contents = this.store.query('content', params);
    }

    return Ember.RSVP.hash(hash);
  },

  actions: {
    updateQueryParams(queryParams){
      const serialize = get(this, 'formSearchService.serialize');
      const props = serialize(queryParams);

      setProperties(this.controller, props);
    }
  },

  setupController(controller, model){
    this._super(...arguments);

    if(!get(controller, 'queryParams')){
      const queryParams = get(this, 'queryParams');
      set(controller, 'queryParams', Object.keys(queryParams));
    }
  }

});
