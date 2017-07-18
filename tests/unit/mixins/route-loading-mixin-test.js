import Ember from 'ember';
import RouteLoadingMixinMixin from 'origins-ember-workshop/mixins/route-loading-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route loading mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteLoadingMixinObject = Ember.Object.extend(RouteLoadingMixinMixin);
  let subject = RouteLoadingMixinObject.create();
  assert.ok(subject);
});
