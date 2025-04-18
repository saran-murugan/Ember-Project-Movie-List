import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-project/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | atleast-one-column-present', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{atleast-one-column-present this.inputValue}}`);

    assert.dom().hasText('1234');
  });
});
