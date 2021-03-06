/**
 * 效果：
 * /data/cephfs/log/board/csv-2015-02-02.log
 */

var fs = require('fs');
var moment = require('moment');
var sprintf = require('sprintf').sprintf;
var path = require('path');

var Logger = {
  root: '/data/cephfs/log/board',
  filename: function (filename, symbol) {
    if (symbol === undefined) {
      symbol = moment().format('YYYY-MM-DD');
    }
    return sprintf('%s/%s-%s.log', this.root, filename, symbol);
  },
  log: function (filename, data, symbol, callback) {
    if (symbol === undefined) {
      symbol = moment().format('YYYY-MM-DD');
    }
    var _filename = sprintf('%s/%s-%s.log', this.root, filename, symbol);
    fs.appendFile(_filename, data + "\n", callback);
  },
  read: function (filename, symbol, callback) {
    if (symbol === undefined) {
      symbol = moment().format('YYYY-MM-DD');
    }
    var _filename = sprintf('%s/%s-%s.log', this.root, filename, symbol);
    fs.readFile(_filename, function (err, data) {
      if (err) throw err;
      callback(err, data);
    });
  },
  
  init: function () {
    this._mkdirs(this.root, 0777, function () {
      console.log('success');
    });
  },
  _mkdirs: function (dir, mode, callback) {
    var self = this;
    fs.exists(dir, function (exists) {
      if (exists) {
        callback(null);
      } else {
        self._mkdirs(path.dirname(dir), mode, function () {
          fs.mkdir(dir, mode, callback);
        });
      }
    });
  }
};

Logger.init();

module.exports = Logger;