import React from 'react';
import { render } from 'react-dom';

import Piechart from '../../../src/index.jsx';
import Label from './Label.jsx';

const colors = ['#F15854', '#4D4D4D', '#5DA5DA', '#DECF3F', '#FAA43A', '#40AF40'];
const values = [80, 1373, 323, 1266, 258, 205];
const labels = ['Germany', 'China', 'USA', 'India', 'Indonesia', 'Brasil'];

const App = () => {
  const handleClick = (valueKey) => {
    // eslint-disable-next-line no-console
    console.log(valueKey);
  };

  return (
    <div>
      <Piechart values={values} size={230} colors={colors} onClick={handleClick}/>
      <Label values={values} colors={colors} labels={labels} />
    </div>
  );
};

render(<App />, document.getElementById('chart'));
