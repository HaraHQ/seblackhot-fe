import { helper } from '@ember/component/helper';

export default helper(function over(params) {
  let [items] = params;
  return items && items.length > 0;
});
