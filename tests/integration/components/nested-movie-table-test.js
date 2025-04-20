import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-project/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nested-movie-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NestedMovieTable />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <NestedMovieTable>
        template block text
      </NestedMovieTable>
    `);

    assert.dom().hasText('template block text');
  });
});
