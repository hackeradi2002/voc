var fetch  = require('node-fetch');
var rewire = require('rewire');
var chai   = require('chai');
var expect = chai.expect;

// setup promise
chai.use(require('chai-as-promised'));

// mock console.log
var collins = rewire('../src/dic/collins');
collins.__set__({
  console: {
    log: function () {}
  }
});

function checkHttpStatus (word) {
  return expect(
    collins(word)
      .then(function (url) { return fetch(url) })
      .then(function (res) { return res.status })
  ).to.eventually.equal(200);
}

describe('dic.collins', function() {

  it('Hello', function () {
    var word = 'Hello';
    return checkHttpStatus(word);
  });

  it('test', function () {
    var word = 'test';
    return checkHttpStatus(word);
  });

  it('test case', function () {
    var word = 'test case';
    return checkHttpStatus(word);
  });

  it('Test-Drive', function () {
    var word = 'Test-Drive';
    return expect(collins(word)).to.eventually.be.rejectedWith(Error);
  });

  it('askdjalksjdl', function () {
    var word = 'askdjalksjdl';
    return expect(collins(word)).to.eventually.be.rejected;
  });

  it('(null)', function () {
    var word = null;
    return expect(collins(word)).to.eventually.be.rejectedWith(TypeError);
  });

  it('123 (number)', function () {
    var word = 123;
    return expect(collins(word)).to.eventually.be.rejectedWith(TypeError);
  });

  it('123 (string)', function () {
    var word = '123';
    return expect(collins(word)).to.eventually.be.rejected;
  });

  it('(Empty String)', function () {
    var word = '';
    return expect(collins(word)).to.eventually.be.rejectedWith(TypeError);
  });

});
