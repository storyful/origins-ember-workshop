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

  model(params){
    let contents = params.query ? [{},{},{},{}] : null;
    return Ember.RSVP.hash({ contents });
  }

});
