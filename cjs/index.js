"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getTotal = function getTotal(values) {
  var total = 0;

  for (var i = 0, c = values.length; i < c; i++) {
    total += values[i];
  }

  return total;
};

var calc = function calc(value, total, l) {
  var percent = value / total; //angle

  var a = 360 * percent;
  var aCalc = a > 180 ? 360 - a : a; //angle in rad

  var aRad = aCalc * Math.PI / 180; //size z

  var z = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(aRad)); //side x

  var x = l * (aCalc <= 90 ? Math.sin(aRad) : Math.sin((180 - aCalc) * Math.PI / 180)); //y coordinate in svg

  var Y = Math.sqrt(z * z - x * x); //do we need to sweep? set depending X coordinate in svg

  if (a <= 180) {
    return [l + x, Y, 0, a];
  } else {
    return [l - x, Y, 1, a];
  }
};

var Piechart = function Piechart(props) {
  var values = props.values,
      colors = props.colors,
      size = props.size,
      onClick = props.onClick;

  var handleClick = function handleClick(valueKey) {
    onClick(valueKey);
  };

  var getContent = function getContent(values, colors, size) {
    var Content = [];
    var l = size / 2;
    var total = getTotal(values);

    var _loop = function _loop(i, c, _r) {
      var value = values[i];
      var color = colors[i];

      var _calc = calc(value, total, l),
          _calc2 = _slicedToArray(_calc, 4),
          X = _calc2[0],
          Y = _calc2[1],
          S = _calc2[2],
          A = _calc2[3];

      Content.push(_react["default"].createElement("path", {
        key: i + '_' + value,
        d: 'M' + l + ',' + l + ' L' + l + ',0 A' + l + ',' + l + ' 0 ' + S + ',1 ' + X + ', ' + Y + ' z',
        fill: color,
        transform: 'rotate(' + _r + ', ' + l + ', ' + l + ')',
        onClick: typeof onClick === 'undefined' ? undefined : function () {
          return handleClick(i);
        }
      }));
      _r += A;
      r = _r;
    };

    for (var i = 0, c = values.length, r = 0; i < c; i++) {
      _loop(i, c, r);
    }

    return Content;
  };

  return _react["default"].createElement("svg", {
    width: size,
    height: size
  }, getContent(values, colors, size));
};

Piechart.propTypes = {
  values: _propTypes["default"].array.isRequired,
  colors: _propTypes["default"].array.isRequired,
  size: _propTypes["default"].number,
  onClick: _propTypes["default"].func
};
Piechart.defaultProps = {
  size: 250
};
var _default = Piechart;
exports["default"] = _default;