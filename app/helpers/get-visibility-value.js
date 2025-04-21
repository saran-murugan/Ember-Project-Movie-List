import { helper } from '@ember/component/helper';

export default helper(function getVisibilityValue([object, column]) {
  return object?.[column];
});
