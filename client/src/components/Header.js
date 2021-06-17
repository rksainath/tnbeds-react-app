import React from 'react';

const Header = () => {
  return (
    <div className='container'>
      <div className='card-panel teal center-align'>
        <div className='row'>
          <div className='col s12'>
            <h5 className='white-text'>TAMILNADU</h5>
            <span className='white-text'>Hospital Bed Status</span>
          </div>
          <div className='col s6'>
            <a href='https://sainathr.com'>
              <span
                className='new badge left'
                data-badge-caption='sainathr.com'
              ></span>
            </a>
          </div>
          <div className='col s6'>
            <a href='https://stopcorona.tn.gov.in/beds.php'>
              <span
                className='new badge right'
                data-badge-caption='stopcorona.tn.gov.in'
              ></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
