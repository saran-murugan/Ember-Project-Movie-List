import { helper } from '@ember/component/helper';

export default helper(function atleastOneColumnPresent([isVisible]) {
  return Object.values(isVisible).some((value) => value === true);
});
