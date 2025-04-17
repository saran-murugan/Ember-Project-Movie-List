import { module, test } from 'qunit';
import { setupTest } from 'ember-project/tests/helpers';

module('Unit | Route | movies/create', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:movies/create');
    assert.ok(route);
  });
});
