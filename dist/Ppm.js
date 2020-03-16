import React from 'react';
import './card.css';

const Card = props => {
  return React.createElement("div", {
    className: "card"
  }, props.children, " this is a new test");
};

export default Card;