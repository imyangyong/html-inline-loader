const expect = require('chai').expect;
const path = require('path');
const loaderRunner = require('../../loader-runner-config');

describe('Script', () =>{
  it('should inline javascript file', function (done) {
    loaderRunner(path.join(__dirname, '../script/index.html'), {}, result => {
      const matched = result.result[0].match(/var a = 'test'/g)
      expect(matched.length === 1).to.be.true;
      done();
    })
  });
})
