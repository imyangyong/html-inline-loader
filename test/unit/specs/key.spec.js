const expect = require('chai').expect;
const path = require('path');
const loaderRunner = require('../../loader-runner-config');

describe('Key', () =>{
  it('buildTime key should be injected', function (done) {
    loaderRunner(path.join(__dirname, '../key/index.html'), {
      buildTime: '2019-06-20'
    }, result => {
      const matched = result.result[0].match(/2019-06-20/g)
      expect(matched.length >= 1).to.be.true;
      done();
    })
  });
  
  it('no buildTime key provided, so the key should be original', function (done) {
    loaderRunner(path.join(__dirname, '../key/index.html'), {}, result => {
      const matched = result.result[0].match(/buildTime/g)
      expect(matched.length === 1).to.be.true;
      done();
    })
  });
})
