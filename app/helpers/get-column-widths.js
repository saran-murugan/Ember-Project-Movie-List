import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function getColumnWidths([columnWidths, colName]) {
  let width = columnWidths?.[colName] || 210;
  return htmlSafe(`width:${width}px;`);
});
