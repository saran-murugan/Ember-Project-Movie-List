import { helper } from '@ember/component/helper';

export default helper(function getSpecificSearchValue([object,columnName]) {
  return object?.[columnName];
});
