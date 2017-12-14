'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  function Log(moduleName, path) {
    _classCallCheck(this, Log);

    this.module = moduleName;
    this.path = path;

    if (path) {
      _fs2.default.writeFileSync(getFile(this.path, this.module), '');
    }
  }

  _createClass(Log, [{
    key: 'info',
    value: function info(text) {
      var string = '[' + getDate() + ']' + _colors2.default.green.bold(' [Info]\t');
      if (this.module) {
        string += '[' + this.module + ']';
      }
      string += ' ' + text;
      this.echo(string);
      this.save(_colors2.default.strip(string));
    }
  }, {
    key: 'warning',
    value: function warning(text) {
      var string = '[' + getDate() + ']' + _colors2.default.yellow.bold(' [Warning]\t');
      if (this.module) {
        string += '[' + this.module + ']';
      }
      string += ' ' + text;
      this.echo(string);
      this.save(_colors2.default.strip(string));
    }
  }, {
    key: 'error',
    value: function error(text) {
      var string = '[' + getDate() + ']' + _colors2.default.red.bold(' [Error]\t');
      if (this.module) {
        string += '[' + this.module + ']';
      }
      string += ' ' + text;
      this.echo(string);
      this.save(_colors2.default.strip(string));
    }
  }, {
    key: 'save',
    value: function save(text) {
      if (this.path) {
        _fs2.default.appendFile(getFile(this.path, this.module), text + '\n', function (err) {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  }, {
    key: 'echo',
    value: function echo(text) {
      console.log(text);
    }
  }, {
    key: 'trace',
    value: function trace(text) {
      console.log(text);
      console.trace();
    }
  }]);

  return Log;
}();

exports.default = Log;


function getFile(savePath, moduleName) {
  var date = new Date();
  return _path2.default.join(savePath, moduleName.toLowerCase() + '.log');
}

function getDate() {
  var date = new Date();
  return formatDateNumbers(formatDateNumbers(date.getDate()) + '/' + formatDateNumbers(date.getMonth() + 1) + '/' + formatDateNumbers(date.getFullYear()) + ' ' + formatDateNumbers(date.getHours()) + ':' + formatDateNumbers(date.getMinutes()) + ':' + formatDateNumbers(date.getSeconds()));
}

function formatDateNumbers(num) {
  num = num.toString();
  while (num.length < 2) {
    num = '0' + num;
  }
  return num;
}