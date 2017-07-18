import Ember from 'ember';

export default Ember.Mixin.create({
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
    }
  }
});
