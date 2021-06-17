import { SET_LOADING, FILTERED_CITIES, GET_BEDS, BEDS_ERROR } from './types';
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case FILTERED_CITIES:
      return { ...state, populateCities: action.payload };
    case GET_BEDS:
      return { ...state, beds: action.payload };
    case BEDS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
