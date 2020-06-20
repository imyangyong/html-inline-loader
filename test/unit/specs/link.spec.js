const expect = require('chai').expect;
const path = require('path');
const loaderRunner = require('../../loader-runner-config');

describe('Link', () =>{
  it('should link extra tags inline', function (done) {
    loaderRunner(path.join(__dirname, '../link/index.html'), {}, result => {
      const matchedTag = result.result[0].match(/<[^/]+?>/g)
      expect(matchedTag).to.have.lengthOf(9);
      done();
    })
  });
})
