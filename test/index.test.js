import React from 'react';
import { mount, shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import assert from 'assert';

configure({ adapter: new Adapter() });

import Piechart from '../src/index.jsx';

describe('<Piechart/>', () => {
  it('should render a proper svg with paths', () => {
    const wrapper = shallow(<Piechart size={50} values={[30, 20]} colors={['#fff', '#000']} />);
    assert(wrapper.html(), '<svg width="50" height="50"><path d="M25,25 L25,0 A25,25 0 1,1 10.305368692688171, 45.22542485937369 z" fill="#fff" transform="rotate(0, 25, 25)"></path><path d="M25,25 L25,0 A25,25 0 0,1 39.69463130731183, 45.22542485937369 z" fill="#000" transform="rotate(216, 25, 25)"></path></svg>');
  });

  it('should handle clicks', () => {
    var c = 0, i = [];
    const onClickTest = (id) => {
      c++;
      i.push(id);
    };
    const wrapper = shallow(<Piechart values={[10, 40, 10]} colors={['#fff', '#000', '#0f0']} onClick={onClickTest}/>);
    const pathList = wrapper.find('path');
    assert(pathList.length, 3);
    pathList.at(0).simulate('click');
    pathList.at(1).simulate('click');
    pathList.at(2).simulate('click');
    assert(c, 3);
    assert(i, [0, 1, 2]);
  });
  it('should have props for values and colors', () => {
    const wrapper = shallow(<Piechart values={[30, 20]} colors={['#fff', '#000']} />);
    assert(typeof wrapper.props().email === 'undefined', true);
    assert(typeof wrapper.props().values === 'undefined', false);
    assert(typeof wrapper.props().colors === 'undefined', false);
    assert(typeof wrapper.props().onClick === 'undefined', true);
  });
});
