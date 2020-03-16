import React from 'react';
import './card.css';

const Card = (props) => {
  return (
    <div className="card">
      {props.children} this is a test
    </div>
  );
};

export default Card;
