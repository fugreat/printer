const Memobird = require('memobird');

const memobird = new Memobird({
  ak: 'xxxxxxxxxxxxxxxx',
  memobirdID: 'xxxxxxxx',
  useridentifying: 'xxx',
});
memobird.init()
  .then(() => memobird.printText('你好咕咕机'))

