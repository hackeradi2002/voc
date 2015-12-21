var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var webster        = require('../src/webster');
var expect         = chai.expect;

// setup promise
chai.use(chaiAsPromised);

describe('Webster', function() {

  it('Hello', function () {
    this.timeout(10000);
    var word = 'Hello';
    return expect(webster(word)).to.eventually.equal(
      'http://media.merriam-webster.com/audio/prons/en/us/mp3/h/hello001.mp3'
    );
  });

  it('test', function () {
    this.timeout(10000);
    var word = 'test';
    return expect(webster(word)).to.eventually.equal(
      'http://media.merriam-webster.com/audio/prons/en/us/mp3/t/test0001.mp3'
    );
  });

  it('askdjalksjdl', function () {
    this.timeout(10000);
    var word = 'askdjalksjdl';
    return expect(webster(word)).to.eventually.be.rejected;
  });

  it('(null)', function () {
    this.timeout(10000);
    var word = null;
    return expect(webster(word)).to.eventually.be.rejectedWith(TypeError);
  });

  it('123 (number)', function () {
    this.timeout(10000);
    var word = 123;
    return expect(webster(word)).to.eventually.be.rejectedWith(TypeError);
  });

  it('123 (string)', function () {
    this.timeout(10000);
    var word = '123';
    return expect(webster(word)).to.eventually.be.rejected;
  });

});
