import React, { useReducer } from 'react';
import BedReducer from './bedReducer';
import BedContext from './bedContext';
import axios from 'axios';
import {
  SET_LOADING,
  FILTERED_CITIES,
  GET_BEDS,
  BEDS_ERROR,
  cities,
} from './types';

const BedState = (props) => {
  const initialState = {
    cities: cities,
    beds: null,
    error: null,
    populateCities: null,
    loading: null,
  };

  const [state, dispatch] = useReducer(BedReducer, initialState);
  // Get Beds
  const getBeds = async (city) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/beds/${city}`);
      dispatch({
        type: GET_BEDS,
        payload: res.data,
      });
      setLoading(false);
    } catch (err) {
      dispatch({
        type: BEDS_ERROR,
        payload: err.response,
      });
    }
  };

  const setLoading = (status) => {
    dispatch({
      type: SET_LOADING,
      payload: status,
    });
  };

  const filteredCities = (filtercities) => {
    dispatch({
      type: FILTERED_CITIES,
      payload: filtercities,
    });
  };

  return (
    <BedContext.Provider
      value={{
        cities: state.cities,
        loading: state.loading,
        populateCities: state.populateCities,
        beds: state.beds,
        error: state.error,
        getBeds,
        filteredCities,
        setLoading,
      }}
    >
      {props.children}
    </BedContext.Provider>
  );
};

export default BedState;
