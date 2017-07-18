import Ember from 'ember';

const { get, set } = Ember;

function filterToQueryParam(filters, type){
  return filters
    .filter(i => i.type === type)
    .filter(i => i.value)
    .map(i => i.label) || undefined;
}

export default Ember.Route.extend({

  queryParams: {
    query:     { refreshModel: true },
    from_date: { refreshModel: true },
    to_date:   { refreshModel: true },
    platforms: { refreshModel: true },
    formats:   { refreshModel: true },
    latlng:    { refreshModel: true },
    page:      { refreshModel: true },
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
    console.log(hash);
    return Ember.RSVP.hash(hash);
  },

  actions: {
    loading(transition, originRoute){
      let previousRoute = this.previousRoute ? this.previousRoute() : null;
      let controller    = this.controllerFor(originRoute.routeName);

      if(previousRoute && previousRoute.name !== originRoute.routeName){ return true; }

      controller.set('loading', true);

      transition.promise.finally(() => {
        controller.set('loading', false);
        window.scrollTo(0,0);
      });

      return false;
    },

    updateQueryParams(queryParams){
      console.log('updateQueryParams', queryParams);

      let ctrl = this.controller;

      set(ctrl, 'query',     queryParams.query || undefined);
      set(ctrl, 'latlng',    queryParams.latlng || undefined);
      set(ctrl, 'latlng',    queryParams.latlng || undefined);
      set(ctrl, 'from_date', queryParams.from_date || undefined);
      set(ctrl, 'to_date',   queryParams.to_date || undefined);
      set(ctrl, 'platforms', filterToQueryParam(queryParams.filter, 'platforms') );
      set(ctrl, 'formats',   filterToQueryParam(queryParams.filter, 'formats') );
      set(ctrl, 'sort_by',   queryParams.sort_by || undefined );
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
