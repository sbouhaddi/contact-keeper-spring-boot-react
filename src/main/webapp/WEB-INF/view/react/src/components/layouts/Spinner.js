import React, { Fragment } from 'react';
import sp from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={sp}
      alt='Loading ...'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
