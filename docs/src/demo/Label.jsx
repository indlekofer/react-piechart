import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
  const { values, colors, labels } = props;

  const getContent = () => {
    const content = [];
    for (let i = 0, c = values.length; i < c; i++) {
      content.push(
        <li key={i}>
          <div style={{width:'15px',height:'15px',backgroundColor:colors[i],marginRight:'15px',display:'inline-block'}}></div>
          <span style={{marginRight:'15px'}}>{labels[i]}</span>
          <span style={{float:'right'}}>{values[i]}</span>
        </li>
      );
    }
    return content;
  };
  return <ul style={{verticalAlign:'top',listStyleType:'none',display:'inline-block'}}>{getContent()}</ul>;
};

Label.propTypes = {
  values: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default Label;
