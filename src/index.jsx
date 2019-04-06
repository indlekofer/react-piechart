import React from 'react';
import PropTypes from 'prop-types';

const getTotal = (values) => {
  var total = 0;
  for (let i = 0, c = values.length; i < c; i++) {
    total += values[i];
  }
  return total;
};
const calc = (value, total, l) => {
  var percent = value / total;
  //angle
  var a = 360 * percent;
  var aCalc = (a > 180) ? 360 - a : a;
  //angle in rad
  var aRad = aCalc * Math.PI / 180;
  //size z
  var z = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(aRad)));
  //side x
  var x = l * (aCalc <= 90 ? Math.sin(aRad) : Math.sin((180 - aCalc) * Math.PI / 180));
  //y coordinate in svg
  var Y = Math.sqrt(z * z - x * x);

  //do we need to sweep? set depending X coordinate in svg
  if (a <= 180) {
    return [l + x, Y, 0, a];
  } else {
    return [l - x, Y, 1, a];
  }
};

const Piechart = (props) => {
  const { values, colors, size, onClick } = props;

  const handleClick = (valueKey) => {
    onClick(valueKey);
  };

  const getContent = (values, colors, size) => {
    const Content = [];
    const l = size / 2;
    const total = getTotal(values);
    for (let i = 0, c = values.length, r = 0; i < c; i++) {
      const value = values[i];
      const color = colors[i];
      const [ X, Y, S, A ] = calc(value, total, l);
      Content.push((<path
        key={i + '_' + value}
        d={'M' + l + ',' + l + ' L' + l + ',0 A' + l + ',' + l + ' 0 ' + S + ',1 ' + X + ', ' + Y + ' z'}
        fill={color}
        transform={'rotate(' + r + ', ' + l + ', ' + l + ')'}
        onClick={typeof onClick === 'undefined' ? undefined : () => handleClick(i)}
      />));
      r += A;
    }
    return Content;
  };
  return <svg width={size} height={size}>{getContent(values, colors, size)}</svg>;
};

Piechart.propTypes = {
  values: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  size: PropTypes.number,
  onClick: PropTypes.func
};

Piechart.defaultProps = {
  size: 250
};

export default Piechart;
