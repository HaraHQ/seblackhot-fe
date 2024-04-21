import { module, test } from 'qunit';
import { setupTest } from 'seblackhot-fe/tests/helpers';

module('Unit | Route | auth', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:auth');
    assert.ok(route);
  });
});
