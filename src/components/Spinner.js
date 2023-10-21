import React from 'react';
import loading from './loading1.gif';

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