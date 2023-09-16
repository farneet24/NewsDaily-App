import React from 'react';
import loading from './Ellipsis-1s-200px.gif';

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner'>
        <img src={loading} alt="Loading" />
      </div>
    </div>
  );
}

export default Spinner;