import { useContext, useState } from 'react';
import BedContext from './context/bedContext';

const Home = () => {
  const bedContext = useContext(BedContext);
  const { cities, beds, filteredCities, populateCities, getBeds, loading } =
    bedContext;
  const [city, setCity] = useState('');
  const [text, setText] = useState('');
  const onChange = (e) => {
    // let searchPhrase = e.target.value;
    setText(e.target.value);

    const filteredCity = cities.filter((city) => {
      const regex = new RegExp(`^${text}`, 'i');
      return regex.test(city);
    });

    filteredCities(filteredCity);
  };

  const onClick = (e) => {
    e.preventDefault();
    setText('');
    let searchCity = e.target.textContent;
    searchCity = searchCity.toLowerCase();
    setCity(searchCity);
    getBeds(searchCity);
    filteredCities(null);
  };

  return (
    <div className='container'>
      <input
        placeholder='Search District'
        value={text}
        id='searchDistrict'
        onChange={onChange}
      />
      {populateCities !== null && (
        <div className='collection'>
          {populateCities.map((city, index) => (
            <a
              href='#!'
              className='collection-item'
              key={index}
              onClick={onClick}
            >
              {city}
            </a>
          ))}
        </div>
      )}
      {loading === true && (
        <div className='progress'>
          <div className='indeterminate'></div>
        </div>
      )}
      <div className='row'>
        <div className='col s12'>
          {beds !== null && beds.length > 1 && loading === false
            ? beds.map((bed, index) => (
                <div className='card' key={`card ${index}`}>
                  <div className='card-content' key={`card content ${index}`}>
                    <h5 className='center-align'>🏥</h5>
                    <h5 key={`Institution ${index}`}>{bed.institution}</h5>
                    <ul className='collection'>
                      <li
                        className='collection-item'
                        key={`Covid Beds ${index}`}
                      >
                        🛏 &nbsp;Covid Beds
                        <span
                          className={
                            bed.covidBedsVacant === '0'
                              ? 'new badge red'
                              : 'new badge'
                          }
                          data-badge-caption='beds'
                        >
                          {bed.covidBedsVacant}
                        </span>
                      </li>
                      <li
                        className='collection-item'
                        key={`Ventilators ${index}`}
                      >
                        🛏 &nbsp;Ventilators
                        <span
                          className={
                            bed.ventilatorVacant === '0'
                              ? 'new badge red'
                              : 'new badge'
                          }
                          data-badge-caption='beds'
                        >
                          {bed.ventilatorVacant}
                        </span>
                      </li>
                      <li className='collection-item' key={`ICU Beds ${index}`}>
                        🛏 &nbsp;ICU Beds
                        <span
                          className={
                            bed.icuBedsVacant === '0'
                              ? 'new badge red'
                              : 'new badge'
                          }
                          data-badge-caption='beds'
                        >
                          {bed.icuBedsVacant}
                        </span>
                      </li>
                      <li
                        className='collection-item'
                        key={`Oxygen Beds ${index}`}
                      >
                        🛏 &nbsp;Oxygen Beds{' '}
                        <span
                          className={
                            bed.oxygenBedsVacant === '0'
                              ? 'new badge red'
                              : 'new badge'
                          }
                          data-badge-caption='beds'
                        >
                          {bed.oxygenBedsVacant}
                        </span>
                      </li>
                      <li
                        className='collection-item'
                        key={`Non-Oxygen Beds ${index}`}
                      >
                        🛏 &nbsp;Non-Oxygen Beds
                        <span
                          className={
                            bed.nonOxygenBedsVacant === '0'
                              ? 'new badge red'
                              : 'new badge'
                          }
                          data-badge-caption='beds'
                        >
                          {bed.nonOxygenBedsVacant}
                        </span>
                      </li>
                      <li
                        className='collection-item center-align'
                        key={`Phone ${index}`}
                      >
                        📞&nbsp; <strong>{bed.contactNumber}</strong>
                      </li>
                      <li
                        className='collection-item center-align'
                        key={`Last Updated ${index}`}
                      >
                        ⏰&nbsp; <strong>{bed.lastUpdated}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            : beds !== null &&
              loading === false && (
                <div className='card'>
                  <div className='card-content'>
                    <p>
                      There is NO update from the hospitals in{' '}
                      {city.toUpperCase()} for today. If you still get this
                      message often, Kindly recheck the spelling of the district
                      that you have input or check for updates after some time.
                    </p>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Home;
