var util      = require('util');
var coroutine = require('co');
var fetch     = require('node-fetch');
var cheerio   = require('cheerio');

module.exports = coroutine.wrap(function * (word) {
  if (typeof word !== 'string' || word.length === 0) {
    throw new TypeError('word should be a string');
  }

  // replace '_' to ' ', and convert to lower case
  word = word.replace(/_/g, ' ').toLowerCase();

  var HOST = 'http://www.collinsdictionary.com';
  var url = HOST + '/search/autocomplete/AMERICAN_DICTIONARY?term=' + word;
  var res = yield fetch(url, {
    timeout: 10 * 1000
  });
  if (res.status !== 200) {
    var msg = util.format('request to %s failed, status code = %d (%s)', url, res.status, res.statusText);
    throw new Error(msg);
  }

  // find the word from list
  var isFound = false;
  var list = JSON.parse(yield res.text());
  for (var i = 0; i < list.length; i++) {
    if (list[i] === word) {
      isFound = true;
      break;
    }
  }

  // word is not found
  if (isFound === false) {
    var err = new Error(word + ' is not found from collins');
    err.code = 'ENOENT';
    throw err;
  }

  // get the word page
  var url = HOST + '/dictionary/american/' + word.replace(/ /g, '-');
  var res = yield fetch(url, {
    timeout: 10 * 1000
  });
  if (res.status !== 200) {
    var msg = util.format('request to %s failed, status code = %d (%s)', url, res.status, res.statusText);
    throw new Error(msg);
  }

  // parse HTML
  var html = yield res.text();
  var $ = cheerio.load(html);

  var map = {};
  var list = [];
  $('a.hwd_sound').each(function (index, ele) {
    var audio = HOST + $(ele).attr('data-src-mp3');
    if (map.hasOwnProperty(audio) === false) {
      map[audio] = true;
      list.push(audio);
    }
  });

  if (list.length === 0) {
    var err = new Error(word + ' has no audio from collins');
    err.code = 'ENOENT';
    throw err;
  }

  // show all the audio url
  if (list.length > 1) {
    list.forEach(function (audio, i) {
      var num = i + 1;
      console.log(num + '. ' + audio);
    });
  }

  // return the first audio from list
  return list[0];
});