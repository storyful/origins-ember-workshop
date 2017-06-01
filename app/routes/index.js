import Ember from 'ember';

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
      hash.contents = this.store.findAll('content');
    }

    return Ember.RSVP.hash(hash);
  }

});
